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
        rev = "11c75db";
        hash = "sha256-GxDlAo9EZg80RKVNPzaL4CXi5TIKzbfydExdd3gK4Bw=";
      };

      npmDepsHash = "sha256-OHr6lcKFCvrtlRl7al6Sz7jmAXdjd1RT2/cGxHJjeqA=";

      nativeBuildInputs = with pkgs; [
        autoPatchelfHook
        electron
      ] ++ buildLibraries pkgs;

      buildInputs = buildLibraries pkgs;
      npmPackFlags = [ "--ignore-scripts" ];

      ELECTRON_SKIP_BINARY_DOWNLOAD = 1;

      installPhase = ''
        npm install
        npm run npm:electron:build
      '';
    };
  };
}
