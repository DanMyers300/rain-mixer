{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
  };

  outputs = { self, nixpkgs, ... } @ inputs: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};

    buildLibraries = pkgs: with pkgs; [
      electron
      bun
    ];

    devShells.${system}.default = pkgs.mkShell {
      buildInputs = buildLibraries pkgs;
    };

  in {

    packages.${system}.default = pkgs.stdenv.mkDerivation {
      name = "rain-mixer";
      src = builtins.path { path = ./.; name = "rain-mixer"; };

      nativeBuildInputs = buildLibraries pkgs;
      buildInputs = buildLibraries pkgs;

      npmDepsHash = "./bun.lockb";
      dontNpmBuild = true;

      installPhase = ''
        mkdir -p $out/bin
        cp -r $src/dist/linux-unpacked/rain-mixer $out/bin/
      '';
    };
  };
}
