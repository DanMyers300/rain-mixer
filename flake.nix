{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
  };

  outputs = { self, nixpkgs, ... } @ inputs: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};

    buildLibraries = pkgs: with pkgs; [
      nspr
      nss
      dbus
      atk
      at-spi2-atk
      cups
      gtk3
      pango
      cairo
      libxkbcommon
      libdrm
      expat
      udev
      alsa-lib
      libgcc
      mesa
      ffmpeg
    ];

    devLibraries = pkgs: with pkgs; [
      electron
      nodejs_23
      bun
    ];

    packageLock = ./package-lock.json;

  in {

    devShells.${system}.default = pkgs.mkShell {
      name = "dev";
      buildInputs = devLibraries pkgs;
    };

    packages.${system}.default = pkgs.buildNpmPackage rec {
      name = "rain-mixer";

      src = pkgs.fetchFromGitHub {
        owner = "DanMyers300";
        repo = "rain-mixer";
        rev = "6a31cff";
        hash = "sha256-ySUFZpagi/vC4TV3gqhj82RrQ37ZHA8VolmrjzdfOck=";
      };

      npmDepsHash = "sha256-Y7YxX0G3ys5r9kli/nO9qY2jq+JO+/tCNKH3zP2+lMM=";

      nativeBuildInputs = with pkgs; [
        autoPatchelfHook
        electron
      ] ++ buildLibraries pkgs;

      buildInputs = buildLibraries pkgs;

      ELECTRON_SKIP_BINARY_DOWNLOAD = 1;

      npmPackFlags = [ "--ignore-scripts" ];
      npmFlags = [ "--offline" "--no-audit" "--no-fund" ];
      makeCacheWritable = true;

      postPatch = ''
        cp ${packageLock} ./package-lock.json
      '';

      installPhase = ''
        mkdir -p $out/share/${name}
        cp -r dist/* $out/share/${name}

        mkdir -p $out/bin
        makeWrapper ${pkgs.electron}/bin/electron $out/bin/${name} \
          --add-flags $out/share/${name}/main.js \
          --prefix LD_LIBRARY_PATH : "${pkgs.lib.makeLibraryPath (buildLibraries pkgs)}"
      '';
    };
  };
}
