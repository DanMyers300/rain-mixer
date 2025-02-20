{
  inputs={
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs={
    self,
    nixpkgs,
    ...
  } @ inputs:
      let
      inherit (self) outputs;
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
  in with pkgs; {
    devShells.${system}.default = mkShell {
      buildInputs = with pkgs; [
        bun
        typescript
        electron
      ];
    };
  };
}
