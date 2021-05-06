import { AgtypeListener } from './AgtypeListener'
import {
  FloatLiteralContext,
  FloatValueContext,
  IntegerValueContext,
  PairContext,
  StringValueContext
} from './AgtypeParser'
import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener'

type MapOrArray = Map<string, any> | any[];

class CustomAgTypeListener implements AgtypeListener, ParseTreeListener {
    rootObject?: MapOrArray;
    objectInsider: MapOrArray[] = [];
    lastValue: any = null;

    exitStringValue (ctx: StringValueContext): void {
      this.lastValue = this.stripQuotes(ctx.text)
    }

    exitIntegerValue (ctx: IntegerValueContext): void {
      this.lastValue = parseInt(ctx.text)
    }

    exitFloatValue (ctx: FloatValueContext): void {
      this.lastValue = parseFloat(ctx.text)
    }

    exitTrueBoolean (): void {
      this.lastValue = true
    }

    exitFalseBoolean (): void {
      this.lastValue = false
    }

    exitNullValue (): void {
      this.lastValue = null
    }

    enterObjectValue (): void {
      this.objectInsider.unshift(new Map())
      this.lastValue = this.objectInsider[0]
    }

    exitObjectValue (): void {
      if (this.objectInsider.length >= 2 && this.objectInsider[1] instanceof Array) {
        const currentObject = this.objectInsider.shift()!;
        (this.objectInsider[0]! as any[]).push(currentObject)
      }
    }

    enterArrayValue (): void {
      this.objectInsider.unshift([])
      this.lastValue = this.objectInsider[0]
    }

    exitArrayValue (): void {
      if (this.objectInsider.length >= 2 && this.objectInsider[1] instanceof Array) {
        // if objectInsider == Object then is pair or root
        const currentObject = this.objectInsider.shift();
        (this.objectInsider[0]! as any[]).push(currentObject)
      }
    }

    exitPair (ctx: PairContext): void {
      const name = this.stripQuotes(ctx.STRING().text)

      if (this.lastValue !== undefined) {
        (this.objectInsider[0] as Map<string, any>).set(name, this.lastValue)
        this.lastValue = undefined
      } else {
        const lastValue = this.objectInsider.shift()
        if (this.objectInsider[0] instanceof Array) {
          this.objectInsider[0].push(lastValue)
        } else {
          (this.objectInsider[0] as Map<string, any>).set(name, lastValue)
        }
      }
    }

    exitFloatLiteral (ctx: FloatLiteralContext): void {
      this.lastValue = ctx.text
    }

    exitAgType (): void {
      this.rootObject = this.objectInsider.shift()
    }

    stripQuotes (quotesString: string) {
      return JSON.parse(quotesString)
    }

    getResult () {
      return this.rootObject
    }

    enterEveryRule (): void {
    }

    exitEveryRule (): void {
    }

    visitErrorNode (): void {
    }

    visitTerminal (): void {
    }
}

export default CustomAgTypeListener
