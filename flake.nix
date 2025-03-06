{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
  };

  outputs = { self, nixpkgs, ... } @ inputs: let
    systems = [ "x86_64-linux" ];
    
    forEachSystem = f: nixpkgs.lib.genAttrs systems (system: f {
      inherit system;
      pkgs = nixpkgs.legacyPackages.${system};
    });

  in {
    packages = forEachSystem ({ pkgs, system }: let
      buildLibraries = with pkgs; [
        nspr nss dbus atk at-spi2-atk
        at-spi2-core cups gtk3 pango
        cairo libxkbcommon libdrm
        expat udev alsa-lib libgcc
        mesa ffmpeg xorg.libX11
        xorg.libXcomposite xorg.libXdamage
        xorg.libXext xorg.libXfixes
        xorg.libXrandr xorg.libxcb
        libappindicator-gtk3
        libuuid musl
      ];
    in {
      default = pkgs.stdenv.mkDerivation rec {
        name = "rain-mixer";
        src = pkgs.fetchzip {
          url = "https://github.com/DanMyers300/rain-mixer/releases/download/latest/rain-mixer.tar.gz";
          hash = "sha256-azzuFBmsfrQsRhinBsQrkf+IC0/dh+eYzAVDTo7rb18=";
        };

        buildInputs = buildLibraries;
        nativeBuildInputs = [
          pkgs.autoPatchelfHook
          pkgs.patchelf
        ] ++ buildLibraries;

        installPhase = ''
          mkdir -p $out/bin
          cp -r linux-unpacked/* $out/bin/
          chmod +x $out/bin/rain-mixer
        '';
      };
    });

    devShells = forEachSystem ({ pkgs, system }: {
      default = pkgs.mkShell {
        name = "dev";
        buildInputs = with pkgs; [
          electron nodejs_23 bun
        ];
      };
    });

    defaultPackage = forEachSystem ({ pkgs, system }: self.packages.${system}.default);
    defaultApp = forEachSystem ({ pkgs, system }: {
      type = "app";
      program = "${self.packages.${system}.default}/bin/rain-mixer";
    });
  };
}
