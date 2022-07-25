const params = new URLSearchParams("access_token=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&scope=public_repo&token_type=bearer")

const obj = Array.from(params.entries()).reduce((obj, [key, value]) => {
  obj[key] = value;
  return obj;
}, {});

console.log(obj);
