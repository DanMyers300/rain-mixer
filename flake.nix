{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
  };

  outputs = { self, nixpkgs, ... } @ inputs: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};

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
      libuuid
      musl
    ];

    devLibraries = with pkgs; [
      electron
      nodejs_23
      bun
    ];

  in with pkgs; {
    devShells.${system}.default = mkShell {
      name = "dev";
      buildInputs = devLibraries;
    };

    packages.${system}.default = stdenv.mkDerivation rec {
      name = "rain-mixer";
      src = fetchzip {
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
  };
}
