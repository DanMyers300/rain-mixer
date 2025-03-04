{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
  };

  outputs = { self, nixpkgs, ... } @ inputs: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};

    buildLibraries = pkgs: with pkgs; [
      electron
      nodejs_23 # Required because electron
      bun
    ];


  in {

    devShells.${system}.default = pkgs.mkShell {
      name = "dev";
      buildInputs = buildLibraries pkgs;
    };

    packages.${system}.default = pkgs.stdenv.mkDerivation {
      name = "rain-mixer";

      binarySrc = pkgs.fetchurl {
        url = "https://github.com/DanMyers300/rain-mixer/releases/download/latest/rain-mixer-x64";
        sha256 = "74d6b92e9cba88ec106ce9550b8b1ae662a38ec20fcc6749835a6c0675df069f";
      };

      dontUnpack = true;

      installPhase = ''
        mkdir -p $out/bin
        cp $binarySrc $out/bin/rain-mixer
        chmod +x $out/bin/rain-mixer
      '';
    };
  };
}
