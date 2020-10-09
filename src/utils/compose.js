export const compose = (fns) => input => 
  fns.reduceRight(
      (f, g) => f.then(g), Promise.resolve(input)
    );
