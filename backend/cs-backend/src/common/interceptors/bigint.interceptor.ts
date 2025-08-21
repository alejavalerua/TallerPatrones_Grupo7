import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

function serializeBigInt(value: any): any {
  if (typeof value === 'bigint') {
    return value.toString(); // evita perder precisión
  }
  if (Array.isArray(value)) {
    return value.map(serializeBigInt);
  }
  if (value && typeof value === 'object') {
    // Mantén Date intacto
    if (value instanceof Date) return value;
    const out: any = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = serializeBigInt(v);
    }
    return out;
  }
  return value;
}

@Injectable()
export class BigIntInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => serializeBigInt(data)));
  }
}
