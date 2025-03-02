{
  inputs={
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
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
        nodejs_23
        typescript
        electron
        tailwindcss
        mesa
      ];
      LD_LIBRARY_PATH="/run/opengl-driver/lib:/run/opengl-driver-32/lib";
    };
  };
}
