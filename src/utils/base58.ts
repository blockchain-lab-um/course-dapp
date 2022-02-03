export var MAP = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
export var from_b58 = function (S: any, A: any) {
  var d = [] as any,
    b = [],
    i,
    j,
    c,
    n;
  for (i in S) {
    i = Number(i);
    (j = 0), (c = A.indexOf(S[i]));
    if (c < 0) return undefined;
    c || b.length ^ i ? i : b.push(0);
    while (j in d || c) {
      n = d[j];
      n = n ? n * 58 + c : c;
      c = n >> 8;
      d[j] = n % 256;
      j++;
    }
  }
  if (j)
    while (j--) {
      b.push(d[j]);
    }
  return new Uint8Array(b);
};

export function toHexString(byteArray: Uint8Array) {
  return Array.prototype.map
    .call(byteArray, function (byte) {
      return ('0' + (byte & 0xff).toString(16)).slice(-2);
    })
    .join('');
}
