export class Base62 {
  private static readonly BASE62 =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private static readonly BASE62_LENGTH = Base62.BASE62.length;

  static encode(num: number): string {
    let result = '';
    while (num > 0) {
      result = Base62.BASE62[num % Base62.BASE62_LENGTH] + result;
      num = Math.floor(num / Base62.BASE62_LENGTH);
    }
    return result;
  }

  static decode(str: string): number {
    let result = 0;
    for (let i = 0; i < str.length; i++) {
      result = result * Base62.BASE62_LENGTH + Base62.BASE62.indexOf(str[i]);
    }
    return result;
  }
}
