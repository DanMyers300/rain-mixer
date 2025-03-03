{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
  };

  outputs = { self, nixpkgs, ... } @ inputs: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};

    # Common libraries function parameterized by pkgs
    commonLibraries = pkgs: with pkgs; [
      # Libraries from the original buildInputs
      libxkbcommon
      cups
      xorg.libXtst
      xorg.libXrandr
      xorg.libXdamage
      xorg.libXcomposite
      xorg.libXcursor
      xorg.libXi
      xorg.libXext
      xorg.libX11
      xorg.libXrender
      xorg.libXfixes
      xorg.libxcb
      pango
      cairo
      gdk-pixbuf
      glib
      gtk3
      atk
      dbus.lib
      expat
      fontconfig
      freetype
      alsa-lib
      nss
      nspr
      mesa

      # Additional libraries from the nix-ld example
      stdenv.cc.cc
      zlib
      fuse3
      icu
      openssl
      curl
    ];

  in {
    devShells.${system}.default = pkgs.mkShell {
      buildInputs = with pkgs; [
        bun
        nodejs_23
        typescript
        electron
        tailwindcss
        p7zip
        appimage-run
        autoPatchelfHook
        
        python3
        gcc
        gnumake
        pkg-config
      ] ++ (commonLibraries pkgs);

      LD_LIBRARY_PATH = "${pkgs.lib.makeLibraryPath (commonLibraries pkgs)}:/run/opengl-driver/lib:/run/opengl-driver-32/lib";

      shellHook = ''
        export ELECTRON_SKIP_BINARY_DOWNLOAD=1
        export npm_config_build_from_source=true
        export npm_config_ignore_scripts=true
        
        # Patch node_modules after installation
        autoPatchelf ./node_modules/7zip-bin/linux/x64/
        autoPatchelf ./node_modules/app-builder-bin/linux/x64/
      '';

      ELECTRON_OVERRIDE_DIST_PATH = "${pkgs.electron}/bin";
    };

    # NixOS module configuring nix-ld with the same libraries
    nixosModules.default = { config, pkgs, ... }: {
      programs.nix-ld = {
        enable = true;
        libraries = commonLibraries pkgs;
      };
    };
  };
}
