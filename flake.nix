{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
  };

  outputs = { self, nixpkgs, ... } @ inputs: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};

    buildLibraries = with pkgs; [
      nspr
      nss
      dbus
      atk
      at-spi2-atk
      at-spi2-core
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
      xorg.libX11
      xorg.libXcomposite
      xorg.libXdamage
      xorg.libXext
      xorg.libXfixes
      xorg.libXrandr
      xorg.libxcb
      libappindicator-gtk3
      libuuid
    ];

    devLibraries = with pkgs; [
      electron
      nodejs_23
      bun
    ];

  in {
    devShells.${system}.default = pkgs.mkShell {
      name = "dev";
      buildInputs = devLibraries;
    };

    packages.${system}.default = pkgs.buildNpmPackage rec {
      name = "rain-mixer";
      src = ./.;

      npmDepsHash = "sha256-OHr6lcKFCvrtlRl7al6Sz7jmAXdjd1RT2/cGxHJjeqA=";

      buildInputs = buildLibraries;
      nativeBuildInputs = [ 
        pkgs.autoPatchelfHook 
        pkgs.patchelf 
      ] ++ devLibraries;

      ELECTRON_SKIP_BINARY_DOWNLOAD = "1";

      npmPackFlags = [ "--ignore-scripts" ];
      dontNpmBuild = true;
      dontNpmInstall = true;

      installPhase = ''
        mkdir -p $out/bin $out/lib
        cp -r $src/dist/linux-unpacked/* $out/bin/
        chmod +x $out/bin/rain-mixer
      '';

      preFixup = ''
        wrapProgram $out/bin/rain-mixer \
          --set NODE_ICU_DATA "${pkgs.icu}/share/icu/${pkgs.icu.version}" \
          --set ICU_DATA "$out/bin/icudtl.dat"
      '';

      postFixup = ''
        find $out -type f -executable -print0 | xargs -0 -I file sh -c '
          if file -b "file" | grep -q "ELF"; then
            patchelf --set-interpreter "${pkgs.stdenv.cc.bintools.dynamicLinker}" \
                     --set-rpath "${pkgs.lib.makeLibraryPath buildLibraries}:$out/lib" \
                     "file"
          fi
        '
      '';
    };
  };
}
