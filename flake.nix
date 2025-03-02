{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
  };

  outputs = { self, nixpkgs, ... } @ inputs: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
  in {
    devShells.${system}.default = pkgs.mkShell {
      buildInputs = with pkgs; [
        bun
        nodejs_23
        typescript
        electron
        tailwindcss
        mesa
        p7zip
        appimage-run
        autoPatchelfHook
        
        libxkbcommon
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
        
        python3
        gcc
        gnumake
        pkg-config
      ];

      LD_LIBRARY_PATH = with pkgs; "${lib.makeLibraryPath [
        libxkbcommon
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
      ]}:/run/opengl-driver/lib:/run/opengl-driver-32/lib";

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
  };
}
