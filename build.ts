async function build (){
  await Bun.build({
    entrypoints: ['./src/index.html'],
    outdir: './dist',
  })
};
build();
