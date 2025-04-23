
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Organization
 * 
 */
export type Organization = $Result.DefaultSelection<Prisma.$OrganizationPayload>
/**
 * Model UserInvitation
 * 
 */
export type UserInvitation = $Result.DefaultSelection<Prisma.$UserInvitationPayload>
/**
 * Model Budget
 * 
 */
export type Budget = $Result.DefaultSelection<Prisma.$BudgetPayload>
/**
 * Model BudgetCategory
 * 
 */
export type BudgetCategory = $Result.DefaultSelection<Prisma.$BudgetCategoryPayload>
/**
 * Model Expense
 * 
 */
export type Expense = $Result.DefaultSelection<Prisma.$ExpensePayload>
/**
 * Model Timesheet
 * 
 */
export type Timesheet = $Result.DefaultSelection<Prisma.$TimesheetPayload>
/**
 * Model TimesheetEntry
 * 
 */
export type TimesheetEntry = $Result.DefaultSelection<Prisma.$TimesheetEntryPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model Subscription
 * 
 */
export type Subscription = $Result.DefaultSelection<Prisma.$SubscriptionPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  ADMIN: 'ADMIN',
  USER: 'USER',
  ORGANIZATION_ADMIN: 'ORGANIZATION_ADMIN',
  ORGANIZATION_MEMBER: 'ORGANIZATION_MEMBER'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const InvitationStatus: {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  EXPIRED: 'EXPIRED'
};

export type InvitationStatus = (typeof InvitationStatus)[keyof typeof InvitationStatus]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type InvitationStatus = $Enums.InvitationStatus

export const InvitationStatus: typeof $Enums.InvitationStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.organization`: Exposes CRUD operations for the **Organization** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Organizations
    * const organizations = await prisma.organization.findMany()
    * ```
    */
  get organization(): Prisma.OrganizationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userInvitation`: Exposes CRUD operations for the **UserInvitation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserInvitations
    * const userInvitations = await prisma.userInvitation.findMany()
    * ```
    */
  get userInvitation(): Prisma.UserInvitationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.budget`: Exposes CRUD operations for the **Budget** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Budgets
    * const budgets = await prisma.budget.findMany()
    * ```
    */
  get budget(): Prisma.BudgetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.budgetCategory`: Exposes CRUD operations for the **BudgetCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BudgetCategories
    * const budgetCategories = await prisma.budgetCategory.findMany()
    * ```
    */
  get budgetCategory(): Prisma.BudgetCategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.expense`: Exposes CRUD operations for the **Expense** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Expenses
    * const expenses = await prisma.expense.findMany()
    * ```
    */
  get expense(): Prisma.ExpenseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.timesheet`: Exposes CRUD operations for the **Timesheet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Timesheets
    * const timesheets = await prisma.timesheet.findMany()
    * ```
    */
  get timesheet(): Prisma.TimesheetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.timesheetEntry`: Exposes CRUD operations for the **TimesheetEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TimesheetEntries
    * const timesheetEntries = await prisma.timesheetEntry.findMany()
    * ```
    */
  get timesheetEntry(): Prisma.TimesheetEntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscription`: Exposes CRUD operations for the **Subscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subscriptions
    * const subscriptions = await prisma.subscription.findMany()
    * ```
    */
  get subscription(): Prisma.SubscriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Organization: 'Organization',
    UserInvitation: 'UserInvitation',
    Budget: 'Budget',
    BudgetCategory: 'BudgetCategory',
    Expense: 'Expense',
    Timesheet: 'Timesheet',
    TimesheetEntry: 'TimesheetEntry',
    Project: 'Project',
    Subscription: 'Subscription',
    Notification: 'Notification',
    AuditLog: 'AuditLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "organization" | "userInvitation" | "budget" | "budgetCategory" | "expense" | "timesheet" | "timesheetEntry" | "project" | "subscription" | "notification" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Organization: {
        payload: Prisma.$OrganizationPayload<ExtArgs>
        fields: Prisma.OrganizationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findFirst: {
            args: Prisma.OrganizationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findMany: {
            args: Prisma.OrganizationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          create: {
            args: Prisma.OrganizationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          createMany: {
            args: Prisma.OrganizationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          delete: {
            args: Prisma.OrganizationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          update: {
            args: Prisma.OrganizationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrganizationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          upsert: {
            args: Prisma.OrganizationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          aggregate: {
            args: Prisma.OrganizationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganization>
          }
          groupBy: {
            args: Prisma.OrganizationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationCountAggregateOutputType> | number
          }
        }
      }
      UserInvitation: {
        payload: Prisma.$UserInvitationPayload<ExtArgs>
        fields: Prisma.UserInvitationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserInvitationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInvitationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserInvitationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInvitationPayload>
          }
          findFirst: {
            args: Prisma.UserInvitationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInvitationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserInvitationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInvitationPayload>
          }
          findMany: {
            args: Prisma.UserInvitationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInvitationPayload>[]
          }
          create: {
            args: Prisma.UserInvitationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInvitationPayload>
          }
          createMany: {
            args: Prisma.UserInvitationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserInvitationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInvitationPayload>[]
          }
          delete: {
            args: Prisma.UserInvitationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInvitationPayload>
          }
          update: {
            args: Prisma.UserInvitationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInvitationPayload>
          }
          deleteMany: {
            args: Prisma.UserInvitationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserInvitationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserInvitationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInvitationPayload>[]
          }
          upsert: {
            args: Prisma.UserInvitationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInvitationPayload>
          }
          aggregate: {
            args: Prisma.UserInvitationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserInvitation>
          }
          groupBy: {
            args: Prisma.UserInvitationGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserInvitationGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserInvitationCountArgs<ExtArgs>
            result: $Utils.Optional<UserInvitationCountAggregateOutputType> | number
          }
        }
      }
      Budget: {
        payload: Prisma.$BudgetPayload<ExtArgs>
        fields: Prisma.BudgetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BudgetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BudgetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          findFirst: {
            args: Prisma.BudgetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BudgetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          findMany: {
            args: Prisma.BudgetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>[]
          }
          create: {
            args: Prisma.BudgetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          createMany: {
            args: Prisma.BudgetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BudgetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>[]
          }
          delete: {
            args: Prisma.BudgetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          update: {
            args: Prisma.BudgetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          deleteMany: {
            args: Prisma.BudgetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BudgetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BudgetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>[]
          }
          upsert: {
            args: Prisma.BudgetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          aggregate: {
            args: Prisma.BudgetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBudget>
          }
          groupBy: {
            args: Prisma.BudgetGroupByArgs<ExtArgs>
            result: $Utils.Optional<BudgetGroupByOutputType>[]
          }
          count: {
            args: Prisma.BudgetCountArgs<ExtArgs>
            result: $Utils.Optional<BudgetCountAggregateOutputType> | number
          }
        }
      }
      BudgetCategory: {
        payload: Prisma.$BudgetCategoryPayload<ExtArgs>
        fields: Prisma.BudgetCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BudgetCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BudgetCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetCategoryPayload>
          }
          findFirst: {
            args: Prisma.BudgetCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BudgetCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetCategoryPayload>
          }
          findMany: {
            args: Prisma.BudgetCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetCategoryPayload>[]
          }
          create: {
            args: Prisma.BudgetCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetCategoryPayload>
          }
          createMany: {
            args: Prisma.BudgetCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BudgetCategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetCategoryPayload>[]
          }
          delete: {
            args: Prisma.BudgetCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetCategoryPayload>
          }
          update: {
            args: Prisma.BudgetCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetCategoryPayload>
          }
          deleteMany: {
            args: Prisma.BudgetCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BudgetCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BudgetCategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetCategoryPayload>[]
          }
          upsert: {
            args: Prisma.BudgetCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetCategoryPayload>
          }
          aggregate: {
            args: Prisma.BudgetCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBudgetCategory>
          }
          groupBy: {
            args: Prisma.BudgetCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<BudgetCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.BudgetCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<BudgetCategoryCountAggregateOutputType> | number
          }
        }
      }
      Expense: {
        payload: Prisma.$ExpensePayload<ExtArgs>
        fields: Prisma.ExpenseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExpenseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExpenseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          findFirst: {
            args: Prisma.ExpenseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExpenseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          findMany: {
            args: Prisma.ExpenseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>[]
          }
          create: {
            args: Prisma.ExpenseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          createMany: {
            args: Prisma.ExpenseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExpenseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>[]
          }
          delete: {
            args: Prisma.ExpenseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          update: {
            args: Prisma.ExpenseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          deleteMany: {
            args: Prisma.ExpenseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExpenseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExpenseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>[]
          }
          upsert: {
            args: Prisma.ExpenseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          aggregate: {
            args: Prisma.ExpenseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExpense>
          }
          groupBy: {
            args: Prisma.ExpenseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExpenseGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExpenseCountArgs<ExtArgs>
            result: $Utils.Optional<ExpenseCountAggregateOutputType> | number
          }
        }
      }
      Timesheet: {
        payload: Prisma.$TimesheetPayload<ExtArgs>
        fields: Prisma.TimesheetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TimesheetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimesheetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TimesheetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimesheetPayload>
          }
          findFirst: {
            args: Prisma.TimesheetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimesheetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TimesheetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimesheetPayload>
          }
          findMany: {
            args: Prisma.TimesheetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimesheetPayload>[]
          }
          create: {
            args: Prisma.TimesheetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimesheetPayload>
          }
          createMany: {
            args: Prisma.TimesheetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TimesheetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimesheetPayload>[]
          }
          delete: {
            args: Prisma.TimesheetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimesheetPayload>
          }
          update: {
            args: Prisma.TimesheetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimesheetPayload>
          }
          deleteMany: {
            args: Prisma.TimesheetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TimesheetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TimesheetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimesheetPayload>[]
          }
          upsert: {
            args: Prisma.TimesheetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimesheetPayload>
          }
          aggregate: {
            args: Prisma.TimesheetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTimesheet>
          }
          groupBy: {
            args: Prisma.TimesheetGroupByArgs<ExtArgs>
            result: $Utils.Optional<TimesheetGroupByOutputType>[]
          }
          count: {
            args: Prisma.TimesheetCountArgs<ExtArgs>
            result: $Utils.Optional<TimesheetCountAggregateOutputType> | number
          }
        }
      }
      TimesheetEntry: {
        payload: Prisma.$TimesheetEntryPayload<ExtArgs>
        fields: Prisma.TimesheetEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TimesheetEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimesheetEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TimesheetEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimesheetEntryPayload>
          }
          findFirst: {
            args: Prisma.TimesheetEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimesheetEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TimesheetEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimesheetEntryPayload>
          }
          findMany: {
            args: Prisma.TimesheetEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimesheetEntryPayload>[]
          }
          create: {
            args: Prisma.TimesheetEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimesheetEntryPayload>
          }
          createMany: {
            args: Prisma.TimesheetEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TimesheetEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimesheetEntryPayload>[]
          }
          delete: {
            args: Prisma.TimesheetEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimesheetEntryPayload>
          }
          update: {
            args: Prisma.TimesheetEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimesheetEntryPayload>
          }
          deleteMany: {
            args: Prisma.TimesheetEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TimesheetEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TimesheetEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimesheetEntryPayload>[]
          }
          upsert: {
            args: Prisma.TimesheetEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimesheetEntryPayload>
          }
          aggregate: {
            args: Prisma.TimesheetEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTimesheetEntry>
          }
          groupBy: {
            args: Prisma.TimesheetEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<TimesheetEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.TimesheetEntryCountArgs<ExtArgs>
            result: $Utils.Optional<TimesheetEntryCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      Subscription: {
        payload: Prisma.$SubscriptionPayload<ExtArgs>
        fields: Prisma.SubscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findFirst: {
            args: Prisma.SubscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findMany: {
            args: Prisma.SubscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          create: {
            args: Prisma.SubscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          createMany: {
            args: Prisma.SubscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubscriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          delete: {
            args: Prisma.SubscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          update: {
            args: Prisma.SubscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          deleteMany: {
            args: Prisma.SubscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubscriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          upsert: {
            args: Prisma.SubscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          aggregate: {
            args: Prisma.SubscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscription>
          }
          groupBy: {
            args: Prisma.SubscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    organization?: OrganizationOmit
    userInvitation?: UserInvitationOmit
    budget?: BudgetOmit
    budgetCategory?: BudgetCategoryOmit
    expense?: ExpenseOmit
    timesheet?: TimesheetOmit
    timesheetEntry?: TimesheetEntryOmit
    project?: ProjectOmit
    subscription?: SubscriptionOmit
    notification?: NotificationOmit
    auditLog?: AuditLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    budgets: number
    expenses: number
    timesheets: number
    invitations: number
    notifications: number
    auditLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    budgets?: boolean | UserCountOutputTypeCountBudgetsArgs
    expenses?: boolean | UserCountOutputTypeCountExpensesArgs
    timesheets?: boolean | UserCountOutputTypeCountTimesheetsArgs
    invitations?: boolean | UserCountOutputTypeCountInvitationsArgs
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBudgetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BudgetWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountExpensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTimesheetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimesheetWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserInvitationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type OrganizationCountOutputType
   */

  export type OrganizationCountOutputType = {
    members: number
    invitations: number
    budgets: number
    expenses: number
    timesheets: number
  }

  export type OrganizationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | OrganizationCountOutputTypeCountMembersArgs
    invitations?: boolean | OrganizationCountOutputTypeCountInvitationsArgs
    budgets?: boolean | OrganizationCountOutputTypeCountBudgetsArgs
    expenses?: boolean | OrganizationCountOutputTypeCountExpensesArgs
    timesheets?: boolean | OrganizationCountOutputTypeCountTimesheetsArgs
  }

  // Custom InputTypes
  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCountOutputType
     */
    select?: OrganizationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserInvitationWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountBudgetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BudgetWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountExpensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountTimesheetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimesheetWhereInput
  }


  /**
   * Count Type BudgetCountOutputType
   */

  export type BudgetCountOutputType = {
    categories: number
    expenses: number
  }

  export type BudgetCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categories?: boolean | BudgetCountOutputTypeCountCategoriesArgs
    expenses?: boolean | BudgetCountOutputTypeCountExpensesArgs
  }

  // Custom InputTypes
  /**
   * BudgetCountOutputType without action
   */
  export type BudgetCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetCountOutputType
     */
    select?: BudgetCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BudgetCountOutputType without action
   */
  export type BudgetCountOutputTypeCountCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BudgetCategoryWhereInput
  }

  /**
   * BudgetCountOutputType without action
   */
  export type BudgetCountOutputTypeCountExpensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseWhereInput
  }


  /**
   * Count Type BudgetCategoryCountOutputType
   */

  export type BudgetCategoryCountOutputType = {
    expenses: number
  }

  export type BudgetCategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expenses?: boolean | BudgetCategoryCountOutputTypeCountExpensesArgs
  }

  // Custom InputTypes
  /**
   * BudgetCategoryCountOutputType without action
   */
  export type BudgetCategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetCategoryCountOutputType
     */
    select?: BudgetCategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BudgetCategoryCountOutputType without action
   */
  export type BudgetCategoryCountOutputTypeCountExpensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseWhereInput
  }


  /**
   * Count Type TimesheetCountOutputType
   */

  export type TimesheetCountOutputType = {
    entries: number
  }

  export type TimesheetCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entries?: boolean | TimesheetCountOutputTypeCountEntriesArgs
  }

  // Custom InputTypes
  /**
   * TimesheetCountOutputType without action
   */
  export type TimesheetCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimesheetCountOutputType
     */
    select?: TimesheetCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TimesheetCountOutputType without action
   */
  export type TimesheetCountOutputTypeCountEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimesheetEntryWhereInput
  }


  /**
   * Count Type TimesheetEntryCountOutputType
   */

  export type TimesheetEntryCountOutputType = {
    expenses: number
  }

  export type TimesheetEntryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expenses?: boolean | TimesheetEntryCountOutputTypeCountExpensesArgs
  }

  // Custom InputTypes
  /**
   * TimesheetEntryCountOutputType without action
   */
  export type TimesheetEntryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimesheetEntryCountOutputType
     */
    select?: TimesheetEntryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TimesheetEntryCountOutputType without action
   */
  export type TimesheetEntryCountOutputTypeCountExpensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    budgets: number
    expenses: number
    timesheets: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    budgets?: boolean | ProjectCountOutputTypeCountBudgetsArgs
    expenses?: boolean | ProjectCountOutputTypeCountExpensesArgs
    timesheets?: boolean | ProjectCountOutputTypeCountTimesheetsArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountBudgetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BudgetWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountExpensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountTimesheetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimesheetWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    username: string | null
    passwordHash: string | null
    firstName: string | null
    lastName: string | null
    role: $Enums.UserRole | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    profileImage: string | null
    phoneNumber: string | null
    resetToken: string | null
    resetTokenExpiry: Date | null
    organizationId: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    username: string | null
    passwordHash: string | null
    firstName: string | null
    lastName: string | null
    role: $Enums.UserRole | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    profileImage: string | null
    phoneNumber: string | null
    resetToken: string | null
    resetTokenExpiry: Date | null
    organizationId: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    username: number
    passwordHash: number
    firstName: number
    lastName: number
    role: number
    isActive: number
    createdAt: number
    updatedAt: number
    profileImage: number
    phoneNumber: number
    resetToken: number
    resetTokenExpiry: number
    organizationId: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    username?: true
    passwordHash?: true
    firstName?: true
    lastName?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    profileImage?: true
    phoneNumber?: true
    resetToken?: true
    resetTokenExpiry?: true
    organizationId?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    username?: true
    passwordHash?: true
    firstName?: true
    lastName?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    profileImage?: true
    phoneNumber?: true
    resetToken?: true
    resetTokenExpiry?: true
    organizationId?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    username?: true
    passwordHash?: true
    firstName?: true
    lastName?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    profileImage?: true
    phoneNumber?: true
    resetToken?: true
    resetTokenExpiry?: true
    organizationId?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    username: string | null
    passwordHash: string
    firstName: string | null
    lastName: string | null
    role: $Enums.UserRole
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    profileImage: string | null
    phoneNumber: string | null
    resetToken: string | null
    resetTokenExpiry: Date | null
    organizationId: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    passwordHash?: boolean
    firstName?: boolean
    lastName?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profileImage?: boolean
    phoneNumber?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
    organizationId?: boolean
    organization?: boolean | User$organizationArgs<ExtArgs>
    ownedOrganization?: boolean | User$ownedOrganizationArgs<ExtArgs>
    budgets?: boolean | User$budgetsArgs<ExtArgs>
    expenses?: boolean | User$expensesArgs<ExtArgs>
    timesheets?: boolean | User$timesheetsArgs<ExtArgs>
    invitations?: boolean | User$invitationsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    passwordHash?: boolean
    firstName?: boolean
    lastName?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profileImage?: boolean
    phoneNumber?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
    organizationId?: boolean
    organization?: boolean | User$organizationArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    passwordHash?: boolean
    firstName?: boolean
    lastName?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profileImage?: boolean
    phoneNumber?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
    organizationId?: boolean
    organization?: boolean | User$organizationArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    username?: boolean
    passwordHash?: boolean
    firstName?: boolean
    lastName?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profileImage?: boolean
    phoneNumber?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
    organizationId?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "username" | "passwordHash" | "firstName" | "lastName" | "role" | "isActive" | "createdAt" | "updatedAt" | "profileImage" | "phoneNumber" | "resetToken" | "resetTokenExpiry" | "organizationId", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | User$organizationArgs<ExtArgs>
    ownedOrganization?: boolean | User$ownedOrganizationArgs<ExtArgs>
    budgets?: boolean | User$budgetsArgs<ExtArgs>
    expenses?: boolean | User$expensesArgs<ExtArgs>
    timesheets?: boolean | User$timesheetsArgs<ExtArgs>
    invitations?: boolean | User$invitationsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | User$organizationArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | User$organizationArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs> | null
      ownedOrganization: Prisma.$OrganizationPayload<ExtArgs> | null
      budgets: Prisma.$BudgetPayload<ExtArgs>[]
      expenses: Prisma.$ExpensePayload<ExtArgs>[]
      timesheets: Prisma.$TimesheetPayload<ExtArgs>[]
      invitations: Prisma.$UserInvitationPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      username: string | null
      passwordHash: string
      firstName: string | null
      lastName: string | null
      role: $Enums.UserRole
      isActive: boolean
      createdAt: Date
      updatedAt: Date
      profileImage: string | null
      phoneNumber: string | null
      resetToken: string | null
      resetTokenExpiry: Date | null
      organizationId: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends User$organizationArgs<ExtArgs> = {}>(args?: Subset<T, User$organizationArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    ownedOrganization<T extends User$ownedOrganizationArgs<ExtArgs> = {}>(args?: Subset<T, User$ownedOrganizationArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    budgets<T extends User$budgetsArgs<ExtArgs> = {}>(args?: Subset<T, User$budgetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    expenses<T extends User$expensesArgs<ExtArgs> = {}>(args?: Subset<T, User$expensesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    timesheets<T extends User$timesheetsArgs<ExtArgs> = {}>(args?: Subset<T, User$timesheetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimesheetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    invitations<T extends User$invitationsArgs<ExtArgs> = {}>(args?: Subset<T, User$invitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly profileImage: FieldRef<"User", 'String'>
    readonly phoneNumber: FieldRef<"User", 'String'>
    readonly resetToken: FieldRef<"User", 'String'>
    readonly resetTokenExpiry: FieldRef<"User", 'DateTime'>
    readonly organizationId: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.organization
   */
  export type User$organizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    where?: OrganizationWhereInput
  }

  /**
   * User.ownedOrganization
   */
  export type User$ownedOrganizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    where?: OrganizationWhereInput
  }

  /**
   * User.budgets
   */
  export type User$budgetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    where?: BudgetWhereInput
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[]
    cursor?: BudgetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BudgetScalarFieldEnum | BudgetScalarFieldEnum[]
  }

  /**
   * User.expenses
   */
  export type User$expensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    where?: ExpenseWhereInput
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    cursor?: ExpenseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * User.timesheets
   */
  export type User$timesheetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timesheet
     */
    select?: TimesheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timesheet
     */
    omit?: TimesheetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimesheetInclude<ExtArgs> | null
    where?: TimesheetWhereInput
    orderBy?: TimesheetOrderByWithRelationInput | TimesheetOrderByWithRelationInput[]
    cursor?: TimesheetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TimesheetScalarFieldEnum | TimesheetScalarFieldEnum[]
  }

  /**
   * User.invitations
   */
  export type User$invitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInvitation
     */
    select?: UserInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInvitation
     */
    omit?: UserInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInvitationInclude<ExtArgs> | null
    where?: UserInvitationWhereInput
    orderBy?: UserInvitationOrderByWithRelationInput | UserInvitationOrderByWithRelationInput[]
    cursor?: UserInvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserInvitationScalarFieldEnum | UserInvitationScalarFieldEnum[]
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Organization
   */

  export type AggregateOrganization = {
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  export type OrganizationMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    description: string | null
    logo: string | null
    website: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isActive: boolean | null
    ownerId: string | null
  }

  export type OrganizationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    description: string | null
    logo: string | null
    website: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isActive: boolean | null
    ownerId: string | null
  }

  export type OrganizationCountAggregateOutputType = {
    id: number
    name: number
    email: number
    description: number
    logo: number
    website: number
    createdAt: number
    updatedAt: number
    isActive: number
    ownerId: number
    _all: number
  }


  export type OrganizationMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    description?: true
    logo?: true
    website?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
    ownerId?: true
  }

  export type OrganizationMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    description?: true
    logo?: true
    website?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
    ownerId?: true
  }

  export type OrganizationCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    description?: true
    logo?: true
    website?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
    ownerId?: true
    _all?: true
  }

  export type OrganizationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organization to aggregate.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Organizations
    **/
    _count?: true | OrganizationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationMaxAggregateInputType
  }

  export type GetOrganizationAggregateType<T extends OrganizationAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganization]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganization[P]>
      : GetScalarType<T[P], AggregateOrganization[P]>
  }




  export type OrganizationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationWhereInput
    orderBy?: OrganizationOrderByWithAggregationInput | OrganizationOrderByWithAggregationInput[]
    by: OrganizationScalarFieldEnum[] | OrganizationScalarFieldEnum
    having?: OrganizationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationCountAggregateInputType | true
    _min?: OrganizationMinAggregateInputType
    _max?: OrganizationMaxAggregateInputType
  }

  export type OrganizationGroupByOutputType = {
    id: string
    name: string
    email: string | null
    description: string | null
    logo: string | null
    website: string | null
    createdAt: Date
    updatedAt: Date
    isActive: boolean
    ownerId: string | null
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  type GetOrganizationGroupByPayload<T extends OrganizationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    description?: boolean
    logo?: boolean
    website?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
    ownerId?: boolean
    owner?: boolean | Organization$ownerArgs<ExtArgs>
    members?: boolean | Organization$membersArgs<ExtArgs>
    invitations?: boolean | Organization$invitationsArgs<ExtArgs>
    budgets?: boolean | Organization$budgetsArgs<ExtArgs>
    expenses?: boolean | Organization$expensesArgs<ExtArgs>
    timesheets?: boolean | Organization$timesheetsArgs<ExtArgs>
    subscription?: boolean | Organization$subscriptionArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    description?: boolean
    logo?: boolean
    website?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
    ownerId?: boolean
    owner?: boolean | Organization$ownerArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    description?: boolean
    logo?: boolean
    website?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
    ownerId?: boolean
    owner?: boolean | Organization$ownerArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    description?: boolean
    logo?: boolean
    website?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
    ownerId?: boolean
  }

  export type OrganizationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "description" | "logo" | "website" | "createdAt" | "updatedAt" | "isActive" | "ownerId", ExtArgs["result"]["organization"]>
  export type OrganizationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | Organization$ownerArgs<ExtArgs>
    members?: boolean | Organization$membersArgs<ExtArgs>
    invitations?: boolean | Organization$invitationsArgs<ExtArgs>
    budgets?: boolean | Organization$budgetsArgs<ExtArgs>
    expenses?: boolean | Organization$expensesArgs<ExtArgs>
    timesheets?: boolean | Organization$timesheetsArgs<ExtArgs>
    subscription?: boolean | Organization$subscriptionArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrganizationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | Organization$ownerArgs<ExtArgs>
  }
  export type OrganizationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | Organization$ownerArgs<ExtArgs>
  }

  export type $OrganizationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Organization"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs> | null
      members: Prisma.$UserPayload<ExtArgs>[]
      invitations: Prisma.$UserInvitationPayload<ExtArgs>[]
      budgets: Prisma.$BudgetPayload<ExtArgs>[]
      expenses: Prisma.$ExpensePayload<ExtArgs>[]
      timesheets: Prisma.$TimesheetPayload<ExtArgs>[]
      subscription: Prisma.$SubscriptionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string | null
      description: string | null
      logo: string | null
      website: string | null
      createdAt: Date
      updatedAt: Date
      isActive: boolean
      ownerId: string | null
    }, ExtArgs["result"]["organization"]>
    composites: {}
  }

  type OrganizationGetPayload<S extends boolean | null | undefined | OrganizationDefaultArgs> = $Result.GetResult<Prisma.$OrganizationPayload, S>

  type OrganizationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrganizationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrganizationCountAggregateInputType | true
    }

  export interface OrganizationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Organization'], meta: { name: 'Organization' } }
    /**
     * Find zero or one Organization that matches the filter.
     * @param {OrganizationFindUniqueArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationFindUniqueArgs>(args: SelectSubset<T, OrganizationFindUniqueArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Organization that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrganizationFindUniqueOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationFindFirstArgs>(args?: SelectSubset<T, OrganizationFindFirstArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Organizations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Organizations
     * const organizations = await prisma.organization.findMany()
     * 
     * // Get first 10 Organizations
     * const organizations = await prisma.organization.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizationWithIdOnly = await prisma.organization.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizationFindManyArgs>(args?: SelectSubset<T, OrganizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Organization.
     * @param {OrganizationCreateArgs} args - Arguments to create a Organization.
     * @example
     * // Create one Organization
     * const Organization = await prisma.organization.create({
     *   data: {
     *     // ... data to create a Organization
     *   }
     * })
     * 
     */
    create<T extends OrganizationCreateArgs>(args: SelectSubset<T, OrganizationCreateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Organizations.
     * @param {OrganizationCreateManyArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationCreateManyArgs>(args?: SelectSubset<T, OrganizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Organizations and returns the data saved in the database.
     * @param {OrganizationCreateManyAndReturnArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizationCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Organization.
     * @param {OrganizationDeleteArgs} args - Arguments to delete one Organization.
     * @example
     * // Delete one Organization
     * const Organization = await prisma.organization.delete({
     *   where: {
     *     // ... filter to delete one Organization
     *   }
     * })
     * 
     */
    delete<T extends OrganizationDeleteArgs>(args: SelectSubset<T, OrganizationDeleteArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Organization.
     * @param {OrganizationUpdateArgs} args - Arguments to update one Organization.
     * @example
     * // Update one Organization
     * const organization = await prisma.organization.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationUpdateArgs>(args: SelectSubset<T, OrganizationUpdateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Organizations.
     * @param {OrganizationDeleteManyArgs} args - Arguments to filter Organizations to delete.
     * @example
     * // Delete a few Organizations
     * const { count } = await prisma.organization.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationDeleteManyArgs>(args?: SelectSubset<T, OrganizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationUpdateManyArgs>(args: SelectSubset<T, OrganizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations and returns the data updated in the database.
     * @param {OrganizationUpdateManyAndReturnArgs} args - Arguments to update many Organizations.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrganizationUpdateManyAndReturnArgs>(args: SelectSubset<T, OrganizationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Organization.
     * @param {OrganizationUpsertArgs} args - Arguments to update or create a Organization.
     * @example
     * // Update or create a Organization
     * const organization = await prisma.organization.upsert({
     *   create: {
     *     // ... data to create a Organization
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Organization we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationUpsertArgs>(args: SelectSubset<T, OrganizationUpsertArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationCountArgs} args - Arguments to filter Organizations to count.
     * @example
     * // Count the number of Organizations
     * const count = await prisma.organization.count({
     *   where: {
     *     // ... the filter for the Organizations we want to count
     *   }
     * })
    **/
    count<T extends OrganizationCountArgs>(
      args?: Subset<T, OrganizationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrganizationAggregateArgs>(args: Subset<T, OrganizationAggregateArgs>): Prisma.PrismaPromise<GetOrganizationAggregateType<T>>

    /**
     * Group by Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrganizationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrganizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Organization model
   */
  readonly fields: OrganizationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Organization.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends Organization$ownerArgs<ExtArgs> = {}>(args?: Subset<T, Organization$ownerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    members<T extends Organization$membersArgs<ExtArgs> = {}>(args?: Subset<T, Organization$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    invitations<T extends Organization$invitationsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$invitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    budgets<T extends Organization$budgetsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$budgetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    expenses<T extends Organization$expensesArgs<ExtArgs> = {}>(args?: Subset<T, Organization$expensesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    timesheets<T extends Organization$timesheetsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$timesheetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimesheetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subscription<T extends Organization$subscriptionArgs<ExtArgs> = {}>(args?: Subset<T, Organization$subscriptionArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Organization model
   */
  interface OrganizationFieldRefs {
    readonly id: FieldRef<"Organization", 'String'>
    readonly name: FieldRef<"Organization", 'String'>
    readonly email: FieldRef<"Organization", 'String'>
    readonly description: FieldRef<"Organization", 'String'>
    readonly logo: FieldRef<"Organization", 'String'>
    readonly website: FieldRef<"Organization", 'String'>
    readonly createdAt: FieldRef<"Organization", 'DateTime'>
    readonly updatedAt: FieldRef<"Organization", 'DateTime'>
    readonly isActive: FieldRef<"Organization", 'Boolean'>
    readonly ownerId: FieldRef<"Organization", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Organization findUnique
   */
  export type OrganizationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findUniqueOrThrow
   */
  export type OrganizationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findFirst
   */
  export type OrganizationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findFirstOrThrow
   */
  export type OrganizationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findMany
   */
  export type OrganizationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organizations to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization create
   */
  export type OrganizationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to create a Organization.
     */
    data: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
  }

  /**
   * Organization createMany
   */
  export type OrganizationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization createManyAndReturn
   */
  export type OrganizationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Organization update
   */
  export type OrganizationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to update a Organization.
     */
    data: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
    /**
     * Choose, which Organization to update.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization updateMany
   */
  export type OrganizationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to update.
     */
    limit?: number
  }

  /**
   * Organization updateManyAndReturn
   */
  export type OrganizationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Organization upsert
   */
  export type OrganizationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The filter to search for the Organization to update in case it exists.
     */
    where: OrganizationWhereUniqueInput
    /**
     * In case the Organization found by the `where` argument doesn't exist, create a new Organization with this data.
     */
    create: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
    /**
     * In case the Organization was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
  }

  /**
   * Organization delete
   */
  export type OrganizationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter which Organization to delete.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization deleteMany
   */
  export type OrganizationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organizations to delete
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to delete.
     */
    limit?: number
  }

  /**
   * Organization.owner
   */
  export type Organization$ownerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Organization.members
   */
  export type Organization$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Organization.invitations
   */
  export type Organization$invitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInvitation
     */
    select?: UserInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInvitation
     */
    omit?: UserInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInvitationInclude<ExtArgs> | null
    where?: UserInvitationWhereInput
    orderBy?: UserInvitationOrderByWithRelationInput | UserInvitationOrderByWithRelationInput[]
    cursor?: UserInvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserInvitationScalarFieldEnum | UserInvitationScalarFieldEnum[]
  }

  /**
   * Organization.budgets
   */
  export type Organization$budgetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    where?: BudgetWhereInput
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[]
    cursor?: BudgetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BudgetScalarFieldEnum | BudgetScalarFieldEnum[]
  }

  /**
   * Organization.expenses
   */
  export type Organization$expensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    where?: ExpenseWhereInput
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    cursor?: ExpenseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Organization.timesheets
   */
  export type Organization$timesheetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timesheet
     */
    select?: TimesheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timesheet
     */
    omit?: TimesheetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimesheetInclude<ExtArgs> | null
    where?: TimesheetWhereInput
    orderBy?: TimesheetOrderByWithRelationInput | TimesheetOrderByWithRelationInput[]
    cursor?: TimesheetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TimesheetScalarFieldEnum | TimesheetScalarFieldEnum[]
  }

  /**
   * Organization.subscription
   */
  export type Organization$subscriptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    where?: SubscriptionWhereInput
  }

  /**
   * Organization without action
   */
  export type OrganizationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
  }


  /**
   * Model UserInvitation
   */

  export type AggregateUserInvitation = {
    _count: UserInvitationCountAggregateOutputType | null
    _min: UserInvitationMinAggregateOutputType | null
    _max: UserInvitationMaxAggregateOutputType | null
  }

  export type UserInvitationMinAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    status: $Enums.InvitationStatus | null
    role: $Enums.UserRole | null
    expiresAt: Date | null
    createdAt: Date | null
    organizationId: string | null
    userId: string | null
  }

  export type UserInvitationMaxAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    status: $Enums.InvitationStatus | null
    role: $Enums.UserRole | null
    expiresAt: Date | null
    createdAt: Date | null
    organizationId: string | null
    userId: string | null
  }

  export type UserInvitationCountAggregateOutputType = {
    id: number
    email: number
    token: number
    status: number
    role: number
    expiresAt: number
    createdAt: number
    organizationId: number
    userId: number
    _all: number
  }


  export type UserInvitationMinAggregateInputType = {
    id?: true
    email?: true
    token?: true
    status?: true
    role?: true
    expiresAt?: true
    createdAt?: true
    organizationId?: true
    userId?: true
  }

  export type UserInvitationMaxAggregateInputType = {
    id?: true
    email?: true
    token?: true
    status?: true
    role?: true
    expiresAt?: true
    createdAt?: true
    organizationId?: true
    userId?: true
  }

  export type UserInvitationCountAggregateInputType = {
    id?: true
    email?: true
    token?: true
    status?: true
    role?: true
    expiresAt?: true
    createdAt?: true
    organizationId?: true
    userId?: true
    _all?: true
  }

  export type UserInvitationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserInvitation to aggregate.
     */
    where?: UserInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInvitations to fetch.
     */
    orderBy?: UserInvitationOrderByWithRelationInput | UserInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInvitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserInvitations
    **/
    _count?: true | UserInvitationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserInvitationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserInvitationMaxAggregateInputType
  }

  export type GetUserInvitationAggregateType<T extends UserInvitationAggregateArgs> = {
        [P in keyof T & keyof AggregateUserInvitation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserInvitation[P]>
      : GetScalarType<T[P], AggregateUserInvitation[P]>
  }




  export type UserInvitationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserInvitationWhereInput
    orderBy?: UserInvitationOrderByWithAggregationInput | UserInvitationOrderByWithAggregationInput[]
    by: UserInvitationScalarFieldEnum[] | UserInvitationScalarFieldEnum
    having?: UserInvitationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserInvitationCountAggregateInputType | true
    _min?: UserInvitationMinAggregateInputType
    _max?: UserInvitationMaxAggregateInputType
  }

  export type UserInvitationGroupByOutputType = {
    id: string
    email: string
    token: string
    status: $Enums.InvitationStatus
    role: $Enums.UserRole
    expiresAt: Date
    createdAt: Date
    organizationId: string
    userId: string | null
    _count: UserInvitationCountAggregateOutputType | null
    _min: UserInvitationMinAggregateOutputType | null
    _max: UserInvitationMaxAggregateOutputType | null
  }

  type GetUserInvitationGroupByPayload<T extends UserInvitationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserInvitationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserInvitationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserInvitationGroupByOutputType[P]>
            : GetScalarType<T[P], UserInvitationGroupByOutputType[P]>
        }
      >
    >


  export type UserInvitationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    status?: boolean
    role?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    organizationId?: boolean
    userId?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    user?: boolean | UserInvitation$userArgs<ExtArgs>
  }, ExtArgs["result"]["userInvitation"]>

  export type UserInvitationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    status?: boolean
    role?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    organizationId?: boolean
    userId?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    user?: boolean | UserInvitation$userArgs<ExtArgs>
  }, ExtArgs["result"]["userInvitation"]>

  export type UserInvitationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    status?: boolean
    role?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    organizationId?: boolean
    userId?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    user?: boolean | UserInvitation$userArgs<ExtArgs>
  }, ExtArgs["result"]["userInvitation"]>

  export type UserInvitationSelectScalar = {
    id?: boolean
    email?: boolean
    token?: boolean
    status?: boolean
    role?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    organizationId?: boolean
    userId?: boolean
  }

  export type UserInvitationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "token" | "status" | "role" | "expiresAt" | "createdAt" | "organizationId" | "userId", ExtArgs["result"]["userInvitation"]>
  export type UserInvitationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    user?: boolean | UserInvitation$userArgs<ExtArgs>
  }
  export type UserInvitationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    user?: boolean | UserInvitation$userArgs<ExtArgs>
  }
  export type UserInvitationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    user?: boolean | UserInvitation$userArgs<ExtArgs>
  }

  export type $UserInvitationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserInvitation"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      token: string
      status: $Enums.InvitationStatus
      role: $Enums.UserRole
      expiresAt: Date
      createdAt: Date
      organizationId: string
      userId: string | null
    }, ExtArgs["result"]["userInvitation"]>
    composites: {}
  }

  type UserInvitationGetPayload<S extends boolean | null | undefined | UserInvitationDefaultArgs> = $Result.GetResult<Prisma.$UserInvitationPayload, S>

  type UserInvitationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserInvitationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserInvitationCountAggregateInputType | true
    }

  export interface UserInvitationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserInvitation'], meta: { name: 'UserInvitation' } }
    /**
     * Find zero or one UserInvitation that matches the filter.
     * @param {UserInvitationFindUniqueArgs} args - Arguments to find a UserInvitation
     * @example
     * // Get one UserInvitation
     * const userInvitation = await prisma.userInvitation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserInvitationFindUniqueArgs>(args: SelectSubset<T, UserInvitationFindUniqueArgs<ExtArgs>>): Prisma__UserInvitationClient<$Result.GetResult<Prisma.$UserInvitationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserInvitation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserInvitationFindUniqueOrThrowArgs} args - Arguments to find a UserInvitation
     * @example
     * // Get one UserInvitation
     * const userInvitation = await prisma.userInvitation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserInvitationFindUniqueOrThrowArgs>(args: SelectSubset<T, UserInvitationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserInvitationClient<$Result.GetResult<Prisma.$UserInvitationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserInvitation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInvitationFindFirstArgs} args - Arguments to find a UserInvitation
     * @example
     * // Get one UserInvitation
     * const userInvitation = await prisma.userInvitation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserInvitationFindFirstArgs>(args?: SelectSubset<T, UserInvitationFindFirstArgs<ExtArgs>>): Prisma__UserInvitationClient<$Result.GetResult<Prisma.$UserInvitationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserInvitation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInvitationFindFirstOrThrowArgs} args - Arguments to find a UserInvitation
     * @example
     * // Get one UserInvitation
     * const userInvitation = await prisma.userInvitation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserInvitationFindFirstOrThrowArgs>(args?: SelectSubset<T, UserInvitationFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserInvitationClient<$Result.GetResult<Prisma.$UserInvitationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserInvitations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInvitationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserInvitations
     * const userInvitations = await prisma.userInvitation.findMany()
     * 
     * // Get first 10 UserInvitations
     * const userInvitations = await prisma.userInvitation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userInvitationWithIdOnly = await prisma.userInvitation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserInvitationFindManyArgs>(args?: SelectSubset<T, UserInvitationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserInvitation.
     * @param {UserInvitationCreateArgs} args - Arguments to create a UserInvitation.
     * @example
     * // Create one UserInvitation
     * const UserInvitation = await prisma.userInvitation.create({
     *   data: {
     *     // ... data to create a UserInvitation
     *   }
     * })
     * 
     */
    create<T extends UserInvitationCreateArgs>(args: SelectSubset<T, UserInvitationCreateArgs<ExtArgs>>): Prisma__UserInvitationClient<$Result.GetResult<Prisma.$UserInvitationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserInvitations.
     * @param {UserInvitationCreateManyArgs} args - Arguments to create many UserInvitations.
     * @example
     * // Create many UserInvitations
     * const userInvitation = await prisma.userInvitation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserInvitationCreateManyArgs>(args?: SelectSubset<T, UserInvitationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserInvitations and returns the data saved in the database.
     * @param {UserInvitationCreateManyAndReturnArgs} args - Arguments to create many UserInvitations.
     * @example
     * // Create many UserInvitations
     * const userInvitation = await prisma.userInvitation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserInvitations and only return the `id`
     * const userInvitationWithIdOnly = await prisma.userInvitation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserInvitationCreateManyAndReturnArgs>(args?: SelectSubset<T, UserInvitationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInvitationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserInvitation.
     * @param {UserInvitationDeleteArgs} args - Arguments to delete one UserInvitation.
     * @example
     * // Delete one UserInvitation
     * const UserInvitation = await prisma.userInvitation.delete({
     *   where: {
     *     // ... filter to delete one UserInvitation
     *   }
     * })
     * 
     */
    delete<T extends UserInvitationDeleteArgs>(args: SelectSubset<T, UserInvitationDeleteArgs<ExtArgs>>): Prisma__UserInvitationClient<$Result.GetResult<Prisma.$UserInvitationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserInvitation.
     * @param {UserInvitationUpdateArgs} args - Arguments to update one UserInvitation.
     * @example
     * // Update one UserInvitation
     * const userInvitation = await prisma.userInvitation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserInvitationUpdateArgs>(args: SelectSubset<T, UserInvitationUpdateArgs<ExtArgs>>): Prisma__UserInvitationClient<$Result.GetResult<Prisma.$UserInvitationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserInvitations.
     * @param {UserInvitationDeleteManyArgs} args - Arguments to filter UserInvitations to delete.
     * @example
     * // Delete a few UserInvitations
     * const { count } = await prisma.userInvitation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserInvitationDeleteManyArgs>(args?: SelectSubset<T, UserInvitationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserInvitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInvitationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserInvitations
     * const userInvitation = await prisma.userInvitation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserInvitationUpdateManyArgs>(args: SelectSubset<T, UserInvitationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserInvitations and returns the data updated in the database.
     * @param {UserInvitationUpdateManyAndReturnArgs} args - Arguments to update many UserInvitations.
     * @example
     * // Update many UserInvitations
     * const userInvitation = await prisma.userInvitation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserInvitations and only return the `id`
     * const userInvitationWithIdOnly = await prisma.userInvitation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserInvitationUpdateManyAndReturnArgs>(args: SelectSubset<T, UserInvitationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInvitationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserInvitation.
     * @param {UserInvitationUpsertArgs} args - Arguments to update or create a UserInvitation.
     * @example
     * // Update or create a UserInvitation
     * const userInvitation = await prisma.userInvitation.upsert({
     *   create: {
     *     // ... data to create a UserInvitation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserInvitation we want to update
     *   }
     * })
     */
    upsert<T extends UserInvitationUpsertArgs>(args: SelectSubset<T, UserInvitationUpsertArgs<ExtArgs>>): Prisma__UserInvitationClient<$Result.GetResult<Prisma.$UserInvitationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserInvitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInvitationCountArgs} args - Arguments to filter UserInvitations to count.
     * @example
     * // Count the number of UserInvitations
     * const count = await prisma.userInvitation.count({
     *   where: {
     *     // ... the filter for the UserInvitations we want to count
     *   }
     * })
    **/
    count<T extends UserInvitationCountArgs>(
      args?: Subset<T, UserInvitationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserInvitationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserInvitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInvitationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserInvitationAggregateArgs>(args: Subset<T, UserInvitationAggregateArgs>): Prisma.PrismaPromise<GetUserInvitationAggregateType<T>>

    /**
     * Group by UserInvitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInvitationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserInvitationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserInvitationGroupByArgs['orderBy'] }
        : { orderBy?: UserInvitationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserInvitationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserInvitationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserInvitation model
   */
  readonly fields: UserInvitationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserInvitation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserInvitationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserInvitation$userArgs<ExtArgs> = {}>(args?: Subset<T, UserInvitation$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserInvitation model
   */
  interface UserInvitationFieldRefs {
    readonly id: FieldRef<"UserInvitation", 'String'>
    readonly email: FieldRef<"UserInvitation", 'String'>
    readonly token: FieldRef<"UserInvitation", 'String'>
    readonly status: FieldRef<"UserInvitation", 'InvitationStatus'>
    readonly role: FieldRef<"UserInvitation", 'UserRole'>
    readonly expiresAt: FieldRef<"UserInvitation", 'DateTime'>
    readonly createdAt: FieldRef<"UserInvitation", 'DateTime'>
    readonly organizationId: FieldRef<"UserInvitation", 'String'>
    readonly userId: FieldRef<"UserInvitation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserInvitation findUnique
   */
  export type UserInvitationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInvitation
     */
    select?: UserInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInvitation
     */
    omit?: UserInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInvitationInclude<ExtArgs> | null
    /**
     * Filter, which UserInvitation to fetch.
     */
    where: UserInvitationWhereUniqueInput
  }

  /**
   * UserInvitation findUniqueOrThrow
   */
  export type UserInvitationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInvitation
     */
    select?: UserInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInvitation
     */
    omit?: UserInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInvitationInclude<ExtArgs> | null
    /**
     * Filter, which UserInvitation to fetch.
     */
    where: UserInvitationWhereUniqueInput
  }

  /**
   * UserInvitation findFirst
   */
  export type UserInvitationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInvitation
     */
    select?: UserInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInvitation
     */
    omit?: UserInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInvitationInclude<ExtArgs> | null
    /**
     * Filter, which UserInvitation to fetch.
     */
    where?: UserInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInvitations to fetch.
     */
    orderBy?: UserInvitationOrderByWithRelationInput | UserInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserInvitations.
     */
    cursor?: UserInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInvitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserInvitations.
     */
    distinct?: UserInvitationScalarFieldEnum | UserInvitationScalarFieldEnum[]
  }

  /**
   * UserInvitation findFirstOrThrow
   */
  export type UserInvitationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInvitation
     */
    select?: UserInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInvitation
     */
    omit?: UserInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInvitationInclude<ExtArgs> | null
    /**
     * Filter, which UserInvitation to fetch.
     */
    where?: UserInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInvitations to fetch.
     */
    orderBy?: UserInvitationOrderByWithRelationInput | UserInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserInvitations.
     */
    cursor?: UserInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInvitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserInvitations.
     */
    distinct?: UserInvitationScalarFieldEnum | UserInvitationScalarFieldEnum[]
  }

  /**
   * UserInvitation findMany
   */
  export type UserInvitationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInvitation
     */
    select?: UserInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInvitation
     */
    omit?: UserInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInvitationInclude<ExtArgs> | null
    /**
     * Filter, which UserInvitations to fetch.
     */
    where?: UserInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInvitations to fetch.
     */
    orderBy?: UserInvitationOrderByWithRelationInput | UserInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserInvitations.
     */
    cursor?: UserInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInvitations.
     */
    skip?: number
    distinct?: UserInvitationScalarFieldEnum | UserInvitationScalarFieldEnum[]
  }

  /**
   * UserInvitation create
   */
  export type UserInvitationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInvitation
     */
    select?: UserInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInvitation
     */
    omit?: UserInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInvitationInclude<ExtArgs> | null
    /**
     * The data needed to create a UserInvitation.
     */
    data: XOR<UserInvitationCreateInput, UserInvitationUncheckedCreateInput>
  }

  /**
   * UserInvitation createMany
   */
  export type UserInvitationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserInvitations.
     */
    data: UserInvitationCreateManyInput | UserInvitationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserInvitation createManyAndReturn
   */
  export type UserInvitationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInvitation
     */
    select?: UserInvitationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserInvitation
     */
    omit?: UserInvitationOmit<ExtArgs> | null
    /**
     * The data used to create many UserInvitations.
     */
    data: UserInvitationCreateManyInput | UserInvitationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInvitationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserInvitation update
   */
  export type UserInvitationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInvitation
     */
    select?: UserInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInvitation
     */
    omit?: UserInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInvitationInclude<ExtArgs> | null
    /**
     * The data needed to update a UserInvitation.
     */
    data: XOR<UserInvitationUpdateInput, UserInvitationUncheckedUpdateInput>
    /**
     * Choose, which UserInvitation to update.
     */
    where: UserInvitationWhereUniqueInput
  }

  /**
   * UserInvitation updateMany
   */
  export type UserInvitationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserInvitations.
     */
    data: XOR<UserInvitationUpdateManyMutationInput, UserInvitationUncheckedUpdateManyInput>
    /**
     * Filter which UserInvitations to update
     */
    where?: UserInvitationWhereInput
    /**
     * Limit how many UserInvitations to update.
     */
    limit?: number
  }

  /**
   * UserInvitation updateManyAndReturn
   */
  export type UserInvitationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInvitation
     */
    select?: UserInvitationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserInvitation
     */
    omit?: UserInvitationOmit<ExtArgs> | null
    /**
     * The data used to update UserInvitations.
     */
    data: XOR<UserInvitationUpdateManyMutationInput, UserInvitationUncheckedUpdateManyInput>
    /**
     * Filter which UserInvitations to update
     */
    where?: UserInvitationWhereInput
    /**
     * Limit how many UserInvitations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInvitationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserInvitation upsert
   */
  export type UserInvitationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInvitation
     */
    select?: UserInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInvitation
     */
    omit?: UserInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInvitationInclude<ExtArgs> | null
    /**
     * The filter to search for the UserInvitation to update in case it exists.
     */
    where: UserInvitationWhereUniqueInput
    /**
     * In case the UserInvitation found by the `where` argument doesn't exist, create a new UserInvitation with this data.
     */
    create: XOR<UserInvitationCreateInput, UserInvitationUncheckedCreateInput>
    /**
     * In case the UserInvitation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserInvitationUpdateInput, UserInvitationUncheckedUpdateInput>
  }

  /**
   * UserInvitation delete
   */
  export type UserInvitationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInvitation
     */
    select?: UserInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInvitation
     */
    omit?: UserInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInvitationInclude<ExtArgs> | null
    /**
     * Filter which UserInvitation to delete.
     */
    where: UserInvitationWhereUniqueInput
  }

  /**
   * UserInvitation deleteMany
   */
  export type UserInvitationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserInvitations to delete
     */
    where?: UserInvitationWhereInput
    /**
     * Limit how many UserInvitations to delete.
     */
    limit?: number
  }

  /**
   * UserInvitation.user
   */
  export type UserInvitation$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * UserInvitation without action
   */
  export type UserInvitationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInvitation
     */
    select?: UserInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInvitation
     */
    omit?: UserInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInvitationInclude<ExtArgs> | null
  }


  /**
   * Model Budget
   */

  export type AggregateBudget = {
    _count: BudgetCountAggregateOutputType | null
    _avg: BudgetAvgAggregateOutputType | null
    _sum: BudgetSumAggregateOutputType | null
    _min: BudgetMinAggregateOutputType | null
    _max: BudgetMaxAggregateOutputType | null
  }

  export type BudgetAvgAggregateOutputType = {
    amount: number | null
  }

  export type BudgetSumAggregateOutputType = {
    amount: number | null
  }

  export type BudgetMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    amount: number | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    organizationId: string | null
    projectId: string | null
  }

  export type BudgetMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    amount: number | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    organizationId: string | null
    projectId: string | null
  }

  export type BudgetCountAggregateOutputType = {
    id: number
    name: number
    description: number
    amount: number
    startDate: number
    endDate: number
    createdAt: number
    updatedAt: number
    userId: number
    organizationId: number
    projectId: number
    _all: number
  }


  export type BudgetAvgAggregateInputType = {
    amount?: true
  }

  export type BudgetSumAggregateInputType = {
    amount?: true
  }

  export type BudgetMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    amount?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    organizationId?: true
    projectId?: true
  }

  export type BudgetMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    amount?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    organizationId?: true
    projectId?: true
  }

  export type BudgetCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    amount?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    organizationId?: true
    projectId?: true
    _all?: true
  }

  export type BudgetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Budget to aggregate.
     */
    where?: BudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Budgets to fetch.
     */
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Budgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Budgets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Budgets
    **/
    _count?: true | BudgetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BudgetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BudgetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BudgetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BudgetMaxAggregateInputType
  }

  export type GetBudgetAggregateType<T extends BudgetAggregateArgs> = {
        [P in keyof T & keyof AggregateBudget]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBudget[P]>
      : GetScalarType<T[P], AggregateBudget[P]>
  }




  export type BudgetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BudgetWhereInput
    orderBy?: BudgetOrderByWithAggregationInput | BudgetOrderByWithAggregationInput[]
    by: BudgetScalarFieldEnum[] | BudgetScalarFieldEnum
    having?: BudgetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BudgetCountAggregateInputType | true
    _avg?: BudgetAvgAggregateInputType
    _sum?: BudgetSumAggregateInputType
    _min?: BudgetMinAggregateInputType
    _max?: BudgetMaxAggregateInputType
  }

  export type BudgetGroupByOutputType = {
    id: string
    name: string
    description: string | null
    amount: number
    startDate: Date
    endDate: Date | null
    createdAt: Date
    updatedAt: Date
    userId: string | null
    organizationId: string | null
    projectId: string | null
    _count: BudgetCountAggregateOutputType | null
    _avg: BudgetAvgAggregateOutputType | null
    _sum: BudgetSumAggregateOutputType | null
    _min: BudgetMinAggregateOutputType | null
    _max: BudgetMaxAggregateOutputType | null
  }

  type GetBudgetGroupByPayload<T extends BudgetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BudgetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BudgetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BudgetGroupByOutputType[P]>
            : GetScalarType<T[P], BudgetGroupByOutputType[P]>
        }
      >
    >


  export type BudgetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    amount?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    organizationId?: boolean
    projectId?: boolean
    user?: boolean | Budget$userArgs<ExtArgs>
    organization?: boolean | Budget$organizationArgs<ExtArgs>
    categories?: boolean | Budget$categoriesArgs<ExtArgs>
    expenses?: boolean | Budget$expensesArgs<ExtArgs>
    project?: boolean | Budget$projectArgs<ExtArgs>
    _count?: boolean | BudgetCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["budget"]>

  export type BudgetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    amount?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    organizationId?: boolean
    projectId?: boolean
    user?: boolean | Budget$userArgs<ExtArgs>
    organization?: boolean | Budget$organizationArgs<ExtArgs>
    project?: boolean | Budget$projectArgs<ExtArgs>
  }, ExtArgs["result"]["budget"]>

  export type BudgetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    amount?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    organizationId?: boolean
    projectId?: boolean
    user?: boolean | Budget$userArgs<ExtArgs>
    organization?: boolean | Budget$organizationArgs<ExtArgs>
    project?: boolean | Budget$projectArgs<ExtArgs>
  }, ExtArgs["result"]["budget"]>

  export type BudgetSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    amount?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    organizationId?: boolean
    projectId?: boolean
  }

  export type BudgetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "amount" | "startDate" | "endDate" | "createdAt" | "updatedAt" | "userId" | "organizationId" | "projectId", ExtArgs["result"]["budget"]>
  export type BudgetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Budget$userArgs<ExtArgs>
    organization?: boolean | Budget$organizationArgs<ExtArgs>
    categories?: boolean | Budget$categoriesArgs<ExtArgs>
    expenses?: boolean | Budget$expensesArgs<ExtArgs>
    project?: boolean | Budget$projectArgs<ExtArgs>
    _count?: boolean | BudgetCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BudgetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Budget$userArgs<ExtArgs>
    organization?: boolean | Budget$organizationArgs<ExtArgs>
    project?: boolean | Budget$projectArgs<ExtArgs>
  }
  export type BudgetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Budget$userArgs<ExtArgs>
    organization?: boolean | Budget$organizationArgs<ExtArgs>
    project?: boolean | Budget$projectArgs<ExtArgs>
  }

  export type $BudgetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Budget"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      organization: Prisma.$OrganizationPayload<ExtArgs> | null
      categories: Prisma.$BudgetCategoryPayload<ExtArgs>[]
      expenses: Prisma.$ExpensePayload<ExtArgs>[]
      project: Prisma.$ProjectPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      amount: number
      startDate: Date
      endDate: Date | null
      createdAt: Date
      updatedAt: Date
      userId: string | null
      organizationId: string | null
      projectId: string | null
    }, ExtArgs["result"]["budget"]>
    composites: {}
  }

  type BudgetGetPayload<S extends boolean | null | undefined | BudgetDefaultArgs> = $Result.GetResult<Prisma.$BudgetPayload, S>

  type BudgetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BudgetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BudgetCountAggregateInputType | true
    }

  export interface BudgetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Budget'], meta: { name: 'Budget' } }
    /**
     * Find zero or one Budget that matches the filter.
     * @param {BudgetFindUniqueArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BudgetFindUniqueArgs>(args: SelectSubset<T, BudgetFindUniqueArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Budget that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BudgetFindUniqueOrThrowArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BudgetFindUniqueOrThrowArgs>(args: SelectSubset<T, BudgetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Budget that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetFindFirstArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BudgetFindFirstArgs>(args?: SelectSubset<T, BudgetFindFirstArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Budget that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetFindFirstOrThrowArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BudgetFindFirstOrThrowArgs>(args?: SelectSubset<T, BudgetFindFirstOrThrowArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Budgets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Budgets
     * const budgets = await prisma.budget.findMany()
     * 
     * // Get first 10 Budgets
     * const budgets = await prisma.budget.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const budgetWithIdOnly = await prisma.budget.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BudgetFindManyArgs>(args?: SelectSubset<T, BudgetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Budget.
     * @param {BudgetCreateArgs} args - Arguments to create a Budget.
     * @example
     * // Create one Budget
     * const Budget = await prisma.budget.create({
     *   data: {
     *     // ... data to create a Budget
     *   }
     * })
     * 
     */
    create<T extends BudgetCreateArgs>(args: SelectSubset<T, BudgetCreateArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Budgets.
     * @param {BudgetCreateManyArgs} args - Arguments to create many Budgets.
     * @example
     * // Create many Budgets
     * const budget = await prisma.budget.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BudgetCreateManyArgs>(args?: SelectSubset<T, BudgetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Budgets and returns the data saved in the database.
     * @param {BudgetCreateManyAndReturnArgs} args - Arguments to create many Budgets.
     * @example
     * // Create many Budgets
     * const budget = await prisma.budget.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Budgets and only return the `id`
     * const budgetWithIdOnly = await prisma.budget.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BudgetCreateManyAndReturnArgs>(args?: SelectSubset<T, BudgetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Budget.
     * @param {BudgetDeleteArgs} args - Arguments to delete one Budget.
     * @example
     * // Delete one Budget
     * const Budget = await prisma.budget.delete({
     *   where: {
     *     // ... filter to delete one Budget
     *   }
     * })
     * 
     */
    delete<T extends BudgetDeleteArgs>(args: SelectSubset<T, BudgetDeleteArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Budget.
     * @param {BudgetUpdateArgs} args - Arguments to update one Budget.
     * @example
     * // Update one Budget
     * const budget = await prisma.budget.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BudgetUpdateArgs>(args: SelectSubset<T, BudgetUpdateArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Budgets.
     * @param {BudgetDeleteManyArgs} args - Arguments to filter Budgets to delete.
     * @example
     * // Delete a few Budgets
     * const { count } = await prisma.budget.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BudgetDeleteManyArgs>(args?: SelectSubset<T, BudgetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Budgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Budgets
     * const budget = await prisma.budget.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BudgetUpdateManyArgs>(args: SelectSubset<T, BudgetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Budgets and returns the data updated in the database.
     * @param {BudgetUpdateManyAndReturnArgs} args - Arguments to update many Budgets.
     * @example
     * // Update many Budgets
     * const budget = await prisma.budget.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Budgets and only return the `id`
     * const budgetWithIdOnly = await prisma.budget.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BudgetUpdateManyAndReturnArgs>(args: SelectSubset<T, BudgetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Budget.
     * @param {BudgetUpsertArgs} args - Arguments to update or create a Budget.
     * @example
     * // Update or create a Budget
     * const budget = await prisma.budget.upsert({
     *   create: {
     *     // ... data to create a Budget
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Budget we want to update
     *   }
     * })
     */
    upsert<T extends BudgetUpsertArgs>(args: SelectSubset<T, BudgetUpsertArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Budgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetCountArgs} args - Arguments to filter Budgets to count.
     * @example
     * // Count the number of Budgets
     * const count = await prisma.budget.count({
     *   where: {
     *     // ... the filter for the Budgets we want to count
     *   }
     * })
    **/
    count<T extends BudgetCountArgs>(
      args?: Subset<T, BudgetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BudgetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Budget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BudgetAggregateArgs>(args: Subset<T, BudgetAggregateArgs>): Prisma.PrismaPromise<GetBudgetAggregateType<T>>

    /**
     * Group by Budget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BudgetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BudgetGroupByArgs['orderBy'] }
        : { orderBy?: BudgetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BudgetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBudgetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Budget model
   */
  readonly fields: BudgetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Budget.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BudgetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Budget$userArgs<ExtArgs> = {}>(args?: Subset<T, Budget$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    organization<T extends Budget$organizationArgs<ExtArgs> = {}>(args?: Subset<T, Budget$organizationArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    categories<T extends Budget$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, Budget$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    expenses<T extends Budget$expensesArgs<ExtArgs> = {}>(args?: Subset<T, Budget$expensesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    project<T extends Budget$projectArgs<ExtArgs> = {}>(args?: Subset<T, Budget$projectArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Budget model
   */
  interface BudgetFieldRefs {
    readonly id: FieldRef<"Budget", 'String'>
    readonly name: FieldRef<"Budget", 'String'>
    readonly description: FieldRef<"Budget", 'String'>
    readonly amount: FieldRef<"Budget", 'Float'>
    readonly startDate: FieldRef<"Budget", 'DateTime'>
    readonly endDate: FieldRef<"Budget", 'DateTime'>
    readonly createdAt: FieldRef<"Budget", 'DateTime'>
    readonly updatedAt: FieldRef<"Budget", 'DateTime'>
    readonly userId: FieldRef<"Budget", 'String'>
    readonly organizationId: FieldRef<"Budget", 'String'>
    readonly projectId: FieldRef<"Budget", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Budget findUnique
   */
  export type BudgetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter, which Budget to fetch.
     */
    where: BudgetWhereUniqueInput
  }

  /**
   * Budget findUniqueOrThrow
   */
  export type BudgetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter, which Budget to fetch.
     */
    where: BudgetWhereUniqueInput
  }

  /**
   * Budget findFirst
   */
  export type BudgetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter, which Budget to fetch.
     */
    where?: BudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Budgets to fetch.
     */
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Budgets.
     */
    cursor?: BudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Budgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Budgets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Budgets.
     */
    distinct?: BudgetScalarFieldEnum | BudgetScalarFieldEnum[]
  }

  /**
   * Budget findFirstOrThrow
   */
  export type BudgetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter, which Budget to fetch.
     */
    where?: BudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Budgets to fetch.
     */
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Budgets.
     */
    cursor?: BudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Budgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Budgets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Budgets.
     */
    distinct?: BudgetScalarFieldEnum | BudgetScalarFieldEnum[]
  }

  /**
   * Budget findMany
   */
  export type BudgetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter, which Budgets to fetch.
     */
    where?: BudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Budgets to fetch.
     */
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Budgets.
     */
    cursor?: BudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Budgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Budgets.
     */
    skip?: number
    distinct?: BudgetScalarFieldEnum | BudgetScalarFieldEnum[]
  }

  /**
   * Budget create
   */
  export type BudgetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * The data needed to create a Budget.
     */
    data: XOR<BudgetCreateInput, BudgetUncheckedCreateInput>
  }

  /**
   * Budget createMany
   */
  export type BudgetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Budgets.
     */
    data: BudgetCreateManyInput | BudgetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Budget createManyAndReturn
   */
  export type BudgetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * The data used to create many Budgets.
     */
    data: BudgetCreateManyInput | BudgetCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Budget update
   */
  export type BudgetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * The data needed to update a Budget.
     */
    data: XOR<BudgetUpdateInput, BudgetUncheckedUpdateInput>
    /**
     * Choose, which Budget to update.
     */
    where: BudgetWhereUniqueInput
  }

  /**
   * Budget updateMany
   */
  export type BudgetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Budgets.
     */
    data: XOR<BudgetUpdateManyMutationInput, BudgetUncheckedUpdateManyInput>
    /**
     * Filter which Budgets to update
     */
    where?: BudgetWhereInput
    /**
     * Limit how many Budgets to update.
     */
    limit?: number
  }

  /**
   * Budget updateManyAndReturn
   */
  export type BudgetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * The data used to update Budgets.
     */
    data: XOR<BudgetUpdateManyMutationInput, BudgetUncheckedUpdateManyInput>
    /**
     * Filter which Budgets to update
     */
    where?: BudgetWhereInput
    /**
     * Limit how many Budgets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Budget upsert
   */
  export type BudgetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * The filter to search for the Budget to update in case it exists.
     */
    where: BudgetWhereUniqueInput
    /**
     * In case the Budget found by the `where` argument doesn't exist, create a new Budget with this data.
     */
    create: XOR<BudgetCreateInput, BudgetUncheckedCreateInput>
    /**
     * In case the Budget was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BudgetUpdateInput, BudgetUncheckedUpdateInput>
  }

  /**
   * Budget delete
   */
  export type BudgetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter which Budget to delete.
     */
    where: BudgetWhereUniqueInput
  }

  /**
   * Budget deleteMany
   */
  export type BudgetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Budgets to delete
     */
    where?: BudgetWhereInput
    /**
     * Limit how many Budgets to delete.
     */
    limit?: number
  }

  /**
   * Budget.user
   */
  export type Budget$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Budget.organization
   */
  export type Budget$organizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    where?: OrganizationWhereInput
  }

  /**
   * Budget.categories
   */
  export type Budget$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetCategory
     */
    select?: BudgetCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetCategory
     */
    omit?: BudgetCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetCategoryInclude<ExtArgs> | null
    where?: BudgetCategoryWhereInput
    orderBy?: BudgetCategoryOrderByWithRelationInput | BudgetCategoryOrderByWithRelationInput[]
    cursor?: BudgetCategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BudgetCategoryScalarFieldEnum | BudgetCategoryScalarFieldEnum[]
  }

  /**
   * Budget.expenses
   */
  export type Budget$expensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    where?: ExpenseWhereInput
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    cursor?: ExpenseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Budget.project
   */
  export type Budget$projectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
  }

  /**
   * Budget without action
   */
  export type BudgetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
  }


  /**
   * Model BudgetCategory
   */

  export type AggregateBudgetCategory = {
    _count: BudgetCategoryCountAggregateOutputType | null
    _avg: BudgetCategoryAvgAggregateOutputType | null
    _sum: BudgetCategorySumAggregateOutputType | null
    _min: BudgetCategoryMinAggregateOutputType | null
    _max: BudgetCategoryMaxAggregateOutputType | null
  }

  export type BudgetCategoryAvgAggregateOutputType = {
    allocatedAmount: number | null
  }

  export type BudgetCategorySumAggregateOutputType = {
    allocatedAmount: number | null
  }

  export type BudgetCategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    allocatedAmount: number | null
    createdAt: Date | null
    updatedAt: Date | null
    budgetId: string | null
  }

  export type BudgetCategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    allocatedAmount: number | null
    createdAt: Date | null
    updatedAt: Date | null
    budgetId: string | null
  }

  export type BudgetCategoryCountAggregateOutputType = {
    id: number
    name: number
    description: number
    allocatedAmount: number
    createdAt: number
    updatedAt: number
    budgetId: number
    _all: number
  }


  export type BudgetCategoryAvgAggregateInputType = {
    allocatedAmount?: true
  }

  export type BudgetCategorySumAggregateInputType = {
    allocatedAmount?: true
  }

  export type BudgetCategoryMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    allocatedAmount?: true
    createdAt?: true
    updatedAt?: true
    budgetId?: true
  }

  export type BudgetCategoryMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    allocatedAmount?: true
    createdAt?: true
    updatedAt?: true
    budgetId?: true
  }

  export type BudgetCategoryCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    allocatedAmount?: true
    createdAt?: true
    updatedAt?: true
    budgetId?: true
    _all?: true
  }

  export type BudgetCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BudgetCategory to aggregate.
     */
    where?: BudgetCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BudgetCategories to fetch.
     */
    orderBy?: BudgetCategoryOrderByWithRelationInput | BudgetCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BudgetCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BudgetCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BudgetCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BudgetCategories
    **/
    _count?: true | BudgetCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BudgetCategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BudgetCategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BudgetCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BudgetCategoryMaxAggregateInputType
  }

  export type GetBudgetCategoryAggregateType<T extends BudgetCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateBudgetCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBudgetCategory[P]>
      : GetScalarType<T[P], AggregateBudgetCategory[P]>
  }




  export type BudgetCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BudgetCategoryWhereInput
    orderBy?: BudgetCategoryOrderByWithAggregationInput | BudgetCategoryOrderByWithAggregationInput[]
    by: BudgetCategoryScalarFieldEnum[] | BudgetCategoryScalarFieldEnum
    having?: BudgetCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BudgetCategoryCountAggregateInputType | true
    _avg?: BudgetCategoryAvgAggregateInputType
    _sum?: BudgetCategorySumAggregateInputType
    _min?: BudgetCategoryMinAggregateInputType
    _max?: BudgetCategoryMaxAggregateInputType
  }

  export type BudgetCategoryGroupByOutputType = {
    id: string
    name: string
    description: string | null
    allocatedAmount: number
    createdAt: Date
    updatedAt: Date
    budgetId: string
    _count: BudgetCategoryCountAggregateOutputType | null
    _avg: BudgetCategoryAvgAggregateOutputType | null
    _sum: BudgetCategorySumAggregateOutputType | null
    _min: BudgetCategoryMinAggregateOutputType | null
    _max: BudgetCategoryMaxAggregateOutputType | null
  }

  type GetBudgetCategoryGroupByPayload<T extends BudgetCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BudgetCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BudgetCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BudgetCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], BudgetCategoryGroupByOutputType[P]>
        }
      >
    >


  export type BudgetCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    allocatedAmount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    budgetId?: boolean
    budget?: boolean | BudgetDefaultArgs<ExtArgs>
    expenses?: boolean | BudgetCategory$expensesArgs<ExtArgs>
    _count?: boolean | BudgetCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["budgetCategory"]>

  export type BudgetCategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    allocatedAmount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    budgetId?: boolean
    budget?: boolean | BudgetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["budgetCategory"]>

  export type BudgetCategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    allocatedAmount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    budgetId?: boolean
    budget?: boolean | BudgetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["budgetCategory"]>

  export type BudgetCategorySelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    allocatedAmount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    budgetId?: boolean
  }

  export type BudgetCategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "allocatedAmount" | "createdAt" | "updatedAt" | "budgetId", ExtArgs["result"]["budgetCategory"]>
  export type BudgetCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    budget?: boolean | BudgetDefaultArgs<ExtArgs>
    expenses?: boolean | BudgetCategory$expensesArgs<ExtArgs>
    _count?: boolean | BudgetCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BudgetCategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    budget?: boolean | BudgetDefaultArgs<ExtArgs>
  }
  export type BudgetCategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    budget?: boolean | BudgetDefaultArgs<ExtArgs>
  }

  export type $BudgetCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BudgetCategory"
    objects: {
      budget: Prisma.$BudgetPayload<ExtArgs>
      expenses: Prisma.$ExpensePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      allocatedAmount: number
      createdAt: Date
      updatedAt: Date
      budgetId: string
    }, ExtArgs["result"]["budgetCategory"]>
    composites: {}
  }

  type BudgetCategoryGetPayload<S extends boolean | null | undefined | BudgetCategoryDefaultArgs> = $Result.GetResult<Prisma.$BudgetCategoryPayload, S>

  type BudgetCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BudgetCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BudgetCategoryCountAggregateInputType | true
    }

  export interface BudgetCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BudgetCategory'], meta: { name: 'BudgetCategory' } }
    /**
     * Find zero or one BudgetCategory that matches the filter.
     * @param {BudgetCategoryFindUniqueArgs} args - Arguments to find a BudgetCategory
     * @example
     * // Get one BudgetCategory
     * const budgetCategory = await prisma.budgetCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BudgetCategoryFindUniqueArgs>(args: SelectSubset<T, BudgetCategoryFindUniqueArgs<ExtArgs>>): Prisma__BudgetCategoryClient<$Result.GetResult<Prisma.$BudgetCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BudgetCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BudgetCategoryFindUniqueOrThrowArgs} args - Arguments to find a BudgetCategory
     * @example
     * // Get one BudgetCategory
     * const budgetCategory = await prisma.budgetCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BudgetCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, BudgetCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BudgetCategoryClient<$Result.GetResult<Prisma.$BudgetCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BudgetCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetCategoryFindFirstArgs} args - Arguments to find a BudgetCategory
     * @example
     * // Get one BudgetCategory
     * const budgetCategory = await prisma.budgetCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BudgetCategoryFindFirstArgs>(args?: SelectSubset<T, BudgetCategoryFindFirstArgs<ExtArgs>>): Prisma__BudgetCategoryClient<$Result.GetResult<Prisma.$BudgetCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BudgetCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetCategoryFindFirstOrThrowArgs} args - Arguments to find a BudgetCategory
     * @example
     * // Get one BudgetCategory
     * const budgetCategory = await prisma.budgetCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BudgetCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, BudgetCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__BudgetCategoryClient<$Result.GetResult<Prisma.$BudgetCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BudgetCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BudgetCategories
     * const budgetCategories = await prisma.budgetCategory.findMany()
     * 
     * // Get first 10 BudgetCategories
     * const budgetCategories = await prisma.budgetCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const budgetCategoryWithIdOnly = await prisma.budgetCategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BudgetCategoryFindManyArgs>(args?: SelectSubset<T, BudgetCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BudgetCategory.
     * @param {BudgetCategoryCreateArgs} args - Arguments to create a BudgetCategory.
     * @example
     * // Create one BudgetCategory
     * const BudgetCategory = await prisma.budgetCategory.create({
     *   data: {
     *     // ... data to create a BudgetCategory
     *   }
     * })
     * 
     */
    create<T extends BudgetCategoryCreateArgs>(args: SelectSubset<T, BudgetCategoryCreateArgs<ExtArgs>>): Prisma__BudgetCategoryClient<$Result.GetResult<Prisma.$BudgetCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BudgetCategories.
     * @param {BudgetCategoryCreateManyArgs} args - Arguments to create many BudgetCategories.
     * @example
     * // Create many BudgetCategories
     * const budgetCategory = await prisma.budgetCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BudgetCategoryCreateManyArgs>(args?: SelectSubset<T, BudgetCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BudgetCategories and returns the data saved in the database.
     * @param {BudgetCategoryCreateManyAndReturnArgs} args - Arguments to create many BudgetCategories.
     * @example
     * // Create many BudgetCategories
     * const budgetCategory = await prisma.budgetCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BudgetCategories and only return the `id`
     * const budgetCategoryWithIdOnly = await prisma.budgetCategory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BudgetCategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, BudgetCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetCategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BudgetCategory.
     * @param {BudgetCategoryDeleteArgs} args - Arguments to delete one BudgetCategory.
     * @example
     * // Delete one BudgetCategory
     * const BudgetCategory = await prisma.budgetCategory.delete({
     *   where: {
     *     // ... filter to delete one BudgetCategory
     *   }
     * })
     * 
     */
    delete<T extends BudgetCategoryDeleteArgs>(args: SelectSubset<T, BudgetCategoryDeleteArgs<ExtArgs>>): Prisma__BudgetCategoryClient<$Result.GetResult<Prisma.$BudgetCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BudgetCategory.
     * @param {BudgetCategoryUpdateArgs} args - Arguments to update one BudgetCategory.
     * @example
     * // Update one BudgetCategory
     * const budgetCategory = await prisma.budgetCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BudgetCategoryUpdateArgs>(args: SelectSubset<T, BudgetCategoryUpdateArgs<ExtArgs>>): Prisma__BudgetCategoryClient<$Result.GetResult<Prisma.$BudgetCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BudgetCategories.
     * @param {BudgetCategoryDeleteManyArgs} args - Arguments to filter BudgetCategories to delete.
     * @example
     * // Delete a few BudgetCategories
     * const { count } = await prisma.budgetCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BudgetCategoryDeleteManyArgs>(args?: SelectSubset<T, BudgetCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BudgetCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BudgetCategories
     * const budgetCategory = await prisma.budgetCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BudgetCategoryUpdateManyArgs>(args: SelectSubset<T, BudgetCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BudgetCategories and returns the data updated in the database.
     * @param {BudgetCategoryUpdateManyAndReturnArgs} args - Arguments to update many BudgetCategories.
     * @example
     * // Update many BudgetCategories
     * const budgetCategory = await prisma.budgetCategory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BudgetCategories and only return the `id`
     * const budgetCategoryWithIdOnly = await prisma.budgetCategory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BudgetCategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, BudgetCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetCategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BudgetCategory.
     * @param {BudgetCategoryUpsertArgs} args - Arguments to update or create a BudgetCategory.
     * @example
     * // Update or create a BudgetCategory
     * const budgetCategory = await prisma.budgetCategory.upsert({
     *   create: {
     *     // ... data to create a BudgetCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BudgetCategory we want to update
     *   }
     * })
     */
    upsert<T extends BudgetCategoryUpsertArgs>(args: SelectSubset<T, BudgetCategoryUpsertArgs<ExtArgs>>): Prisma__BudgetCategoryClient<$Result.GetResult<Prisma.$BudgetCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BudgetCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetCategoryCountArgs} args - Arguments to filter BudgetCategories to count.
     * @example
     * // Count the number of BudgetCategories
     * const count = await prisma.budgetCategory.count({
     *   where: {
     *     // ... the filter for the BudgetCategories we want to count
     *   }
     * })
    **/
    count<T extends BudgetCategoryCountArgs>(
      args?: Subset<T, BudgetCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BudgetCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BudgetCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BudgetCategoryAggregateArgs>(args: Subset<T, BudgetCategoryAggregateArgs>): Prisma.PrismaPromise<GetBudgetCategoryAggregateType<T>>

    /**
     * Group by BudgetCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BudgetCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BudgetCategoryGroupByArgs['orderBy'] }
        : { orderBy?: BudgetCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BudgetCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBudgetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BudgetCategory model
   */
  readonly fields: BudgetCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BudgetCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BudgetCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    budget<T extends BudgetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BudgetDefaultArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    expenses<T extends BudgetCategory$expensesArgs<ExtArgs> = {}>(args?: Subset<T, BudgetCategory$expensesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BudgetCategory model
   */
  interface BudgetCategoryFieldRefs {
    readonly id: FieldRef<"BudgetCategory", 'String'>
    readonly name: FieldRef<"BudgetCategory", 'String'>
    readonly description: FieldRef<"BudgetCategory", 'String'>
    readonly allocatedAmount: FieldRef<"BudgetCategory", 'Float'>
    readonly createdAt: FieldRef<"BudgetCategory", 'DateTime'>
    readonly updatedAt: FieldRef<"BudgetCategory", 'DateTime'>
    readonly budgetId: FieldRef<"BudgetCategory", 'String'>
  }
    

  // Custom InputTypes
  /**
   * BudgetCategory findUnique
   */
  export type BudgetCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetCategory
     */
    select?: BudgetCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetCategory
     */
    omit?: BudgetCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetCategoryInclude<ExtArgs> | null
    /**
     * Filter, which BudgetCategory to fetch.
     */
    where: BudgetCategoryWhereUniqueInput
  }

  /**
   * BudgetCategory findUniqueOrThrow
   */
  export type BudgetCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetCategory
     */
    select?: BudgetCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetCategory
     */
    omit?: BudgetCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetCategoryInclude<ExtArgs> | null
    /**
     * Filter, which BudgetCategory to fetch.
     */
    where: BudgetCategoryWhereUniqueInput
  }

  /**
   * BudgetCategory findFirst
   */
  export type BudgetCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetCategory
     */
    select?: BudgetCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetCategory
     */
    omit?: BudgetCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetCategoryInclude<ExtArgs> | null
    /**
     * Filter, which BudgetCategory to fetch.
     */
    where?: BudgetCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BudgetCategories to fetch.
     */
    orderBy?: BudgetCategoryOrderByWithRelationInput | BudgetCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BudgetCategories.
     */
    cursor?: BudgetCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BudgetCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BudgetCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BudgetCategories.
     */
    distinct?: BudgetCategoryScalarFieldEnum | BudgetCategoryScalarFieldEnum[]
  }

  /**
   * BudgetCategory findFirstOrThrow
   */
  export type BudgetCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetCategory
     */
    select?: BudgetCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetCategory
     */
    omit?: BudgetCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetCategoryInclude<ExtArgs> | null
    /**
     * Filter, which BudgetCategory to fetch.
     */
    where?: BudgetCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BudgetCategories to fetch.
     */
    orderBy?: BudgetCategoryOrderByWithRelationInput | BudgetCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BudgetCategories.
     */
    cursor?: BudgetCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BudgetCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BudgetCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BudgetCategories.
     */
    distinct?: BudgetCategoryScalarFieldEnum | BudgetCategoryScalarFieldEnum[]
  }

  /**
   * BudgetCategory findMany
   */
  export type BudgetCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetCategory
     */
    select?: BudgetCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetCategory
     */
    omit?: BudgetCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetCategoryInclude<ExtArgs> | null
    /**
     * Filter, which BudgetCategories to fetch.
     */
    where?: BudgetCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BudgetCategories to fetch.
     */
    orderBy?: BudgetCategoryOrderByWithRelationInput | BudgetCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BudgetCategories.
     */
    cursor?: BudgetCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BudgetCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BudgetCategories.
     */
    skip?: number
    distinct?: BudgetCategoryScalarFieldEnum | BudgetCategoryScalarFieldEnum[]
  }

  /**
   * BudgetCategory create
   */
  export type BudgetCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetCategory
     */
    select?: BudgetCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetCategory
     */
    omit?: BudgetCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a BudgetCategory.
     */
    data: XOR<BudgetCategoryCreateInput, BudgetCategoryUncheckedCreateInput>
  }

  /**
   * BudgetCategory createMany
   */
  export type BudgetCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BudgetCategories.
     */
    data: BudgetCategoryCreateManyInput | BudgetCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BudgetCategory createManyAndReturn
   */
  export type BudgetCategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetCategory
     */
    select?: BudgetCategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetCategory
     */
    omit?: BudgetCategoryOmit<ExtArgs> | null
    /**
     * The data used to create many BudgetCategories.
     */
    data: BudgetCategoryCreateManyInput | BudgetCategoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetCategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BudgetCategory update
   */
  export type BudgetCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetCategory
     */
    select?: BudgetCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetCategory
     */
    omit?: BudgetCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a BudgetCategory.
     */
    data: XOR<BudgetCategoryUpdateInput, BudgetCategoryUncheckedUpdateInput>
    /**
     * Choose, which BudgetCategory to update.
     */
    where: BudgetCategoryWhereUniqueInput
  }

  /**
   * BudgetCategory updateMany
   */
  export type BudgetCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BudgetCategories.
     */
    data: XOR<BudgetCategoryUpdateManyMutationInput, BudgetCategoryUncheckedUpdateManyInput>
    /**
     * Filter which BudgetCategories to update
     */
    where?: BudgetCategoryWhereInput
    /**
     * Limit how many BudgetCategories to update.
     */
    limit?: number
  }

  /**
   * BudgetCategory updateManyAndReturn
   */
  export type BudgetCategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetCategory
     */
    select?: BudgetCategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetCategory
     */
    omit?: BudgetCategoryOmit<ExtArgs> | null
    /**
     * The data used to update BudgetCategories.
     */
    data: XOR<BudgetCategoryUpdateManyMutationInput, BudgetCategoryUncheckedUpdateManyInput>
    /**
     * Filter which BudgetCategories to update
     */
    where?: BudgetCategoryWhereInput
    /**
     * Limit how many BudgetCategories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetCategoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BudgetCategory upsert
   */
  export type BudgetCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetCategory
     */
    select?: BudgetCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetCategory
     */
    omit?: BudgetCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the BudgetCategory to update in case it exists.
     */
    where: BudgetCategoryWhereUniqueInput
    /**
     * In case the BudgetCategory found by the `where` argument doesn't exist, create a new BudgetCategory with this data.
     */
    create: XOR<BudgetCategoryCreateInput, BudgetCategoryUncheckedCreateInput>
    /**
     * In case the BudgetCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BudgetCategoryUpdateInput, BudgetCategoryUncheckedUpdateInput>
  }

  /**
   * BudgetCategory delete
   */
  export type BudgetCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetCategory
     */
    select?: BudgetCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetCategory
     */
    omit?: BudgetCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetCategoryInclude<ExtArgs> | null
    /**
     * Filter which BudgetCategory to delete.
     */
    where: BudgetCategoryWhereUniqueInput
  }

  /**
   * BudgetCategory deleteMany
   */
  export type BudgetCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BudgetCategories to delete
     */
    where?: BudgetCategoryWhereInput
    /**
     * Limit how many BudgetCategories to delete.
     */
    limit?: number
  }

  /**
   * BudgetCategory.expenses
   */
  export type BudgetCategory$expensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    where?: ExpenseWhereInput
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    cursor?: ExpenseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * BudgetCategory without action
   */
  export type BudgetCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetCategory
     */
    select?: BudgetCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetCategory
     */
    omit?: BudgetCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetCategoryInclude<ExtArgs> | null
  }


  /**
   * Model Expense
   */

  export type AggregateExpense = {
    _count: ExpenseCountAggregateOutputType | null
    _avg: ExpenseAvgAggregateOutputType | null
    _sum: ExpenseSumAggregateOutputType | null
    _min: ExpenseMinAggregateOutputType | null
    _max: ExpenseMaxAggregateOutputType | null
  }

  export type ExpenseAvgAggregateOutputType = {
    amount: number | null
  }

  export type ExpenseSumAggregateOutputType = {
    amount: number | null
  }

  export type ExpenseMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    amount: number | null
    date: Date | null
    receiptUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    organizationId: string | null
    budgetId: string | null
    categoryId: string | null
    timesheetEntryId: string | null
    projectId: string | null
  }

  export type ExpenseMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    amount: number | null
    date: Date | null
    receiptUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    organizationId: string | null
    budgetId: string | null
    categoryId: string | null
    timesheetEntryId: string | null
    projectId: string | null
  }

  export type ExpenseCountAggregateOutputType = {
    id: number
    title: number
    description: number
    amount: number
    date: number
    receiptUrl: number
    createdAt: number
    updatedAt: number
    userId: number
    organizationId: number
    budgetId: number
    categoryId: number
    timesheetEntryId: number
    projectId: number
    _all: number
  }


  export type ExpenseAvgAggregateInputType = {
    amount?: true
  }

  export type ExpenseSumAggregateInputType = {
    amount?: true
  }

  export type ExpenseMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    amount?: true
    date?: true
    receiptUrl?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    organizationId?: true
    budgetId?: true
    categoryId?: true
    timesheetEntryId?: true
    projectId?: true
  }

  export type ExpenseMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    amount?: true
    date?: true
    receiptUrl?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    organizationId?: true
    budgetId?: true
    categoryId?: true
    timesheetEntryId?: true
    projectId?: true
  }

  export type ExpenseCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    amount?: true
    date?: true
    receiptUrl?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    organizationId?: true
    budgetId?: true
    categoryId?: true
    timesheetEntryId?: true
    projectId?: true
    _all?: true
  }

  export type ExpenseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Expense to aggregate.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Expenses
    **/
    _count?: true | ExpenseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExpenseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExpenseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExpenseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExpenseMaxAggregateInputType
  }

  export type GetExpenseAggregateType<T extends ExpenseAggregateArgs> = {
        [P in keyof T & keyof AggregateExpense]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExpense[P]>
      : GetScalarType<T[P], AggregateExpense[P]>
  }




  export type ExpenseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseWhereInput
    orderBy?: ExpenseOrderByWithAggregationInput | ExpenseOrderByWithAggregationInput[]
    by: ExpenseScalarFieldEnum[] | ExpenseScalarFieldEnum
    having?: ExpenseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExpenseCountAggregateInputType | true
    _avg?: ExpenseAvgAggregateInputType
    _sum?: ExpenseSumAggregateInputType
    _min?: ExpenseMinAggregateInputType
    _max?: ExpenseMaxAggregateInputType
  }

  export type ExpenseGroupByOutputType = {
    id: string
    title: string
    description: string | null
    amount: number
    date: Date
    receiptUrl: string | null
    createdAt: Date
    updatedAt: Date
    userId: string | null
    organizationId: string | null
    budgetId: string | null
    categoryId: string | null
    timesheetEntryId: string | null
    projectId: string | null
    _count: ExpenseCountAggregateOutputType | null
    _avg: ExpenseAvgAggregateOutputType | null
    _sum: ExpenseSumAggregateOutputType | null
    _min: ExpenseMinAggregateOutputType | null
    _max: ExpenseMaxAggregateOutputType | null
  }

  type GetExpenseGroupByPayload<T extends ExpenseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExpenseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExpenseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExpenseGroupByOutputType[P]>
            : GetScalarType<T[P], ExpenseGroupByOutputType[P]>
        }
      >
    >


  export type ExpenseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    amount?: boolean
    date?: boolean
    receiptUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    organizationId?: boolean
    budgetId?: boolean
    categoryId?: boolean
    timesheetEntryId?: boolean
    projectId?: boolean
    user?: boolean | Expense$userArgs<ExtArgs>
    organization?: boolean | Expense$organizationArgs<ExtArgs>
    budget?: boolean | Expense$budgetArgs<ExtArgs>
    category?: boolean | Expense$categoryArgs<ExtArgs>
    timesheetEntry?: boolean | Expense$timesheetEntryArgs<ExtArgs>
    project?: boolean | Expense$projectArgs<ExtArgs>
  }, ExtArgs["result"]["expense"]>

  export type ExpenseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    amount?: boolean
    date?: boolean
    receiptUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    organizationId?: boolean
    budgetId?: boolean
    categoryId?: boolean
    timesheetEntryId?: boolean
    projectId?: boolean
    user?: boolean | Expense$userArgs<ExtArgs>
    organization?: boolean | Expense$organizationArgs<ExtArgs>
    budget?: boolean | Expense$budgetArgs<ExtArgs>
    category?: boolean | Expense$categoryArgs<ExtArgs>
    timesheetEntry?: boolean | Expense$timesheetEntryArgs<ExtArgs>
    project?: boolean | Expense$projectArgs<ExtArgs>
  }, ExtArgs["result"]["expense"]>

  export type ExpenseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    amount?: boolean
    date?: boolean
    receiptUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    organizationId?: boolean
    budgetId?: boolean
    categoryId?: boolean
    timesheetEntryId?: boolean
    projectId?: boolean
    user?: boolean | Expense$userArgs<ExtArgs>
    organization?: boolean | Expense$organizationArgs<ExtArgs>
    budget?: boolean | Expense$budgetArgs<ExtArgs>
    category?: boolean | Expense$categoryArgs<ExtArgs>
    timesheetEntry?: boolean | Expense$timesheetEntryArgs<ExtArgs>
    project?: boolean | Expense$projectArgs<ExtArgs>
  }, ExtArgs["result"]["expense"]>

  export type ExpenseSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    amount?: boolean
    date?: boolean
    receiptUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    organizationId?: boolean
    budgetId?: boolean
    categoryId?: boolean
    timesheetEntryId?: boolean
    projectId?: boolean
  }

  export type ExpenseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "amount" | "date" | "receiptUrl" | "createdAt" | "updatedAt" | "userId" | "organizationId" | "budgetId" | "categoryId" | "timesheetEntryId" | "projectId", ExtArgs["result"]["expense"]>
  export type ExpenseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Expense$userArgs<ExtArgs>
    organization?: boolean | Expense$organizationArgs<ExtArgs>
    budget?: boolean | Expense$budgetArgs<ExtArgs>
    category?: boolean | Expense$categoryArgs<ExtArgs>
    timesheetEntry?: boolean | Expense$timesheetEntryArgs<ExtArgs>
    project?: boolean | Expense$projectArgs<ExtArgs>
  }
  export type ExpenseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Expense$userArgs<ExtArgs>
    organization?: boolean | Expense$organizationArgs<ExtArgs>
    budget?: boolean | Expense$budgetArgs<ExtArgs>
    category?: boolean | Expense$categoryArgs<ExtArgs>
    timesheetEntry?: boolean | Expense$timesheetEntryArgs<ExtArgs>
    project?: boolean | Expense$projectArgs<ExtArgs>
  }
  export type ExpenseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Expense$userArgs<ExtArgs>
    organization?: boolean | Expense$organizationArgs<ExtArgs>
    budget?: boolean | Expense$budgetArgs<ExtArgs>
    category?: boolean | Expense$categoryArgs<ExtArgs>
    timesheetEntry?: boolean | Expense$timesheetEntryArgs<ExtArgs>
    project?: boolean | Expense$projectArgs<ExtArgs>
  }

  export type $ExpensePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Expense"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      organization: Prisma.$OrganizationPayload<ExtArgs> | null
      budget: Prisma.$BudgetPayload<ExtArgs> | null
      category: Prisma.$BudgetCategoryPayload<ExtArgs> | null
      timesheetEntry: Prisma.$TimesheetEntryPayload<ExtArgs> | null
      project: Prisma.$ProjectPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      amount: number
      date: Date
      receiptUrl: string | null
      createdAt: Date
      updatedAt: Date
      userId: string | null
      organizationId: string | null
      budgetId: string | null
      categoryId: string | null
      timesheetEntryId: string | null
      projectId: string | null
    }, ExtArgs["result"]["expense"]>
    composites: {}
  }

  type ExpenseGetPayload<S extends boolean | null | undefined | ExpenseDefaultArgs> = $Result.GetResult<Prisma.$ExpensePayload, S>

  type ExpenseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExpenseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExpenseCountAggregateInputType | true
    }

  export interface ExpenseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Expense'], meta: { name: 'Expense' } }
    /**
     * Find zero or one Expense that matches the filter.
     * @param {ExpenseFindUniqueArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExpenseFindUniqueArgs>(args: SelectSubset<T, ExpenseFindUniqueArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Expense that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExpenseFindUniqueOrThrowArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExpenseFindUniqueOrThrowArgs>(args: SelectSubset<T, ExpenseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Expense that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindFirstArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExpenseFindFirstArgs>(args?: SelectSubset<T, ExpenseFindFirstArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Expense that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindFirstOrThrowArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExpenseFindFirstOrThrowArgs>(args?: SelectSubset<T, ExpenseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Expenses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Expenses
     * const expenses = await prisma.expense.findMany()
     * 
     * // Get first 10 Expenses
     * const expenses = await prisma.expense.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const expenseWithIdOnly = await prisma.expense.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExpenseFindManyArgs>(args?: SelectSubset<T, ExpenseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Expense.
     * @param {ExpenseCreateArgs} args - Arguments to create a Expense.
     * @example
     * // Create one Expense
     * const Expense = await prisma.expense.create({
     *   data: {
     *     // ... data to create a Expense
     *   }
     * })
     * 
     */
    create<T extends ExpenseCreateArgs>(args: SelectSubset<T, ExpenseCreateArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Expenses.
     * @param {ExpenseCreateManyArgs} args - Arguments to create many Expenses.
     * @example
     * // Create many Expenses
     * const expense = await prisma.expense.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExpenseCreateManyArgs>(args?: SelectSubset<T, ExpenseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Expenses and returns the data saved in the database.
     * @param {ExpenseCreateManyAndReturnArgs} args - Arguments to create many Expenses.
     * @example
     * // Create many Expenses
     * const expense = await prisma.expense.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Expenses and only return the `id`
     * const expenseWithIdOnly = await prisma.expense.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExpenseCreateManyAndReturnArgs>(args?: SelectSubset<T, ExpenseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Expense.
     * @param {ExpenseDeleteArgs} args - Arguments to delete one Expense.
     * @example
     * // Delete one Expense
     * const Expense = await prisma.expense.delete({
     *   where: {
     *     // ... filter to delete one Expense
     *   }
     * })
     * 
     */
    delete<T extends ExpenseDeleteArgs>(args: SelectSubset<T, ExpenseDeleteArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Expense.
     * @param {ExpenseUpdateArgs} args - Arguments to update one Expense.
     * @example
     * // Update one Expense
     * const expense = await prisma.expense.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExpenseUpdateArgs>(args: SelectSubset<T, ExpenseUpdateArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Expenses.
     * @param {ExpenseDeleteManyArgs} args - Arguments to filter Expenses to delete.
     * @example
     * // Delete a few Expenses
     * const { count } = await prisma.expense.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExpenseDeleteManyArgs>(args?: SelectSubset<T, ExpenseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Expenses
     * const expense = await prisma.expense.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExpenseUpdateManyArgs>(args: SelectSubset<T, ExpenseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Expenses and returns the data updated in the database.
     * @param {ExpenseUpdateManyAndReturnArgs} args - Arguments to update many Expenses.
     * @example
     * // Update many Expenses
     * const expense = await prisma.expense.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Expenses and only return the `id`
     * const expenseWithIdOnly = await prisma.expense.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExpenseUpdateManyAndReturnArgs>(args: SelectSubset<T, ExpenseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Expense.
     * @param {ExpenseUpsertArgs} args - Arguments to update or create a Expense.
     * @example
     * // Update or create a Expense
     * const expense = await prisma.expense.upsert({
     *   create: {
     *     // ... data to create a Expense
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Expense we want to update
     *   }
     * })
     */
    upsert<T extends ExpenseUpsertArgs>(args: SelectSubset<T, ExpenseUpsertArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCountArgs} args - Arguments to filter Expenses to count.
     * @example
     * // Count the number of Expenses
     * const count = await prisma.expense.count({
     *   where: {
     *     // ... the filter for the Expenses we want to count
     *   }
     * })
    **/
    count<T extends ExpenseCountArgs>(
      args?: Subset<T, ExpenseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExpenseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Expense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExpenseAggregateArgs>(args: Subset<T, ExpenseAggregateArgs>): Prisma.PrismaPromise<GetExpenseAggregateType<T>>

    /**
     * Group by Expense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExpenseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExpenseGroupByArgs['orderBy'] }
        : { orderBy?: ExpenseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExpenseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExpenseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Expense model
   */
  readonly fields: ExpenseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Expense.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExpenseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Expense$userArgs<ExtArgs> = {}>(args?: Subset<T, Expense$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    organization<T extends Expense$organizationArgs<ExtArgs> = {}>(args?: Subset<T, Expense$organizationArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    budget<T extends Expense$budgetArgs<ExtArgs> = {}>(args?: Subset<T, Expense$budgetArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    category<T extends Expense$categoryArgs<ExtArgs> = {}>(args?: Subset<T, Expense$categoryArgs<ExtArgs>>): Prisma__BudgetCategoryClient<$Result.GetResult<Prisma.$BudgetCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    timesheetEntry<T extends Expense$timesheetEntryArgs<ExtArgs> = {}>(args?: Subset<T, Expense$timesheetEntryArgs<ExtArgs>>): Prisma__TimesheetEntryClient<$Result.GetResult<Prisma.$TimesheetEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    project<T extends Expense$projectArgs<ExtArgs> = {}>(args?: Subset<T, Expense$projectArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Expense model
   */
  interface ExpenseFieldRefs {
    readonly id: FieldRef<"Expense", 'String'>
    readonly title: FieldRef<"Expense", 'String'>
    readonly description: FieldRef<"Expense", 'String'>
    readonly amount: FieldRef<"Expense", 'Float'>
    readonly date: FieldRef<"Expense", 'DateTime'>
    readonly receiptUrl: FieldRef<"Expense", 'String'>
    readonly createdAt: FieldRef<"Expense", 'DateTime'>
    readonly updatedAt: FieldRef<"Expense", 'DateTime'>
    readonly userId: FieldRef<"Expense", 'String'>
    readonly organizationId: FieldRef<"Expense", 'String'>
    readonly budgetId: FieldRef<"Expense", 'String'>
    readonly categoryId: FieldRef<"Expense", 'String'>
    readonly timesheetEntryId: FieldRef<"Expense", 'String'>
    readonly projectId: FieldRef<"Expense", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Expense findUnique
   */
  export type ExpenseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense findUniqueOrThrow
   */
  export type ExpenseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense findFirst
   */
  export type ExpenseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Expenses.
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Expenses.
     */
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Expense findFirstOrThrow
   */
  export type ExpenseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Expenses.
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Expenses.
     */
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Expense findMany
   */
  export type ExpenseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expenses to fetch.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Expenses.
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Expense create
   */
  export type ExpenseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * The data needed to create a Expense.
     */
    data: XOR<ExpenseCreateInput, ExpenseUncheckedCreateInput>
  }

  /**
   * Expense createMany
   */
  export type ExpenseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Expenses.
     */
    data: ExpenseCreateManyInput | ExpenseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Expense createManyAndReturn
   */
  export type ExpenseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * The data used to create many Expenses.
     */
    data: ExpenseCreateManyInput | ExpenseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Expense update
   */
  export type ExpenseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * The data needed to update a Expense.
     */
    data: XOR<ExpenseUpdateInput, ExpenseUncheckedUpdateInput>
    /**
     * Choose, which Expense to update.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense updateMany
   */
  export type ExpenseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Expenses.
     */
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyInput>
    /**
     * Filter which Expenses to update
     */
    where?: ExpenseWhereInput
    /**
     * Limit how many Expenses to update.
     */
    limit?: number
  }

  /**
   * Expense updateManyAndReturn
   */
  export type ExpenseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * The data used to update Expenses.
     */
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyInput>
    /**
     * Filter which Expenses to update
     */
    where?: ExpenseWhereInput
    /**
     * Limit how many Expenses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Expense upsert
   */
  export type ExpenseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * The filter to search for the Expense to update in case it exists.
     */
    where: ExpenseWhereUniqueInput
    /**
     * In case the Expense found by the `where` argument doesn't exist, create a new Expense with this data.
     */
    create: XOR<ExpenseCreateInput, ExpenseUncheckedCreateInput>
    /**
     * In case the Expense was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExpenseUpdateInput, ExpenseUncheckedUpdateInput>
  }

  /**
   * Expense delete
   */
  export type ExpenseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter which Expense to delete.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense deleteMany
   */
  export type ExpenseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Expenses to delete
     */
    where?: ExpenseWhereInput
    /**
     * Limit how many Expenses to delete.
     */
    limit?: number
  }

  /**
   * Expense.user
   */
  export type Expense$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Expense.organization
   */
  export type Expense$organizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    where?: OrganizationWhereInput
  }

  /**
   * Expense.budget
   */
  export type Expense$budgetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    where?: BudgetWhereInput
  }

  /**
   * Expense.category
   */
  export type Expense$categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetCategory
     */
    select?: BudgetCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetCategory
     */
    omit?: BudgetCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetCategoryInclude<ExtArgs> | null
    where?: BudgetCategoryWhereInput
  }

  /**
   * Expense.timesheetEntry
   */
  export type Expense$timesheetEntryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimesheetEntry
     */
    select?: TimesheetEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimesheetEntry
     */
    omit?: TimesheetEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimesheetEntryInclude<ExtArgs> | null
    where?: TimesheetEntryWhereInput
  }

  /**
   * Expense.project
   */
  export type Expense$projectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
  }

  /**
   * Expense without action
   */
  export type ExpenseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
  }


  /**
   * Model Timesheet
   */

  export type AggregateTimesheet = {
    _count: TimesheetCountAggregateOutputType | null
    _min: TimesheetMinAggregateOutputType | null
    _max: TimesheetMaxAggregateOutputType | null
  }

  export type TimesheetMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    startDate: Date | null
    endDate: Date | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    organizationId: string | null
    projectId: string | null
  }

  export type TimesheetMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    startDate: Date | null
    endDate: Date | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    organizationId: string | null
    projectId: string | null
  }

  export type TimesheetCountAggregateOutputType = {
    id: number
    name: number
    description: number
    startDate: number
    endDate: number
    status: number
    createdAt: number
    updatedAt: number
    userId: number
    organizationId: number
    projectId: number
    _all: number
  }


  export type TimesheetMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    startDate?: true
    endDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    organizationId?: true
    projectId?: true
  }

  export type TimesheetMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    startDate?: true
    endDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    organizationId?: true
    projectId?: true
  }

  export type TimesheetCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    startDate?: true
    endDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    organizationId?: true
    projectId?: true
    _all?: true
  }

  export type TimesheetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Timesheet to aggregate.
     */
    where?: TimesheetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Timesheets to fetch.
     */
    orderBy?: TimesheetOrderByWithRelationInput | TimesheetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TimesheetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Timesheets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Timesheets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Timesheets
    **/
    _count?: true | TimesheetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TimesheetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TimesheetMaxAggregateInputType
  }

  export type GetTimesheetAggregateType<T extends TimesheetAggregateArgs> = {
        [P in keyof T & keyof AggregateTimesheet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTimesheet[P]>
      : GetScalarType<T[P], AggregateTimesheet[P]>
  }




  export type TimesheetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimesheetWhereInput
    orderBy?: TimesheetOrderByWithAggregationInput | TimesheetOrderByWithAggregationInput[]
    by: TimesheetScalarFieldEnum[] | TimesheetScalarFieldEnum
    having?: TimesheetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TimesheetCountAggregateInputType | true
    _min?: TimesheetMinAggregateInputType
    _max?: TimesheetMaxAggregateInputType
  }

  export type TimesheetGroupByOutputType = {
    id: string
    name: string
    description: string | null
    startDate: Date
    endDate: Date | null
    status: string
    createdAt: Date
    updatedAt: Date
    userId: string | null
    organizationId: string | null
    projectId: string | null
    _count: TimesheetCountAggregateOutputType | null
    _min: TimesheetMinAggregateOutputType | null
    _max: TimesheetMaxAggregateOutputType | null
  }

  type GetTimesheetGroupByPayload<T extends TimesheetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TimesheetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TimesheetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TimesheetGroupByOutputType[P]>
            : GetScalarType<T[P], TimesheetGroupByOutputType[P]>
        }
      >
    >


  export type TimesheetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    organizationId?: boolean
    projectId?: boolean
    user?: boolean | Timesheet$userArgs<ExtArgs>
    organization?: boolean | Timesheet$organizationArgs<ExtArgs>
    entries?: boolean | Timesheet$entriesArgs<ExtArgs>
    project?: boolean | Timesheet$projectArgs<ExtArgs>
    _count?: boolean | TimesheetCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timesheet"]>

  export type TimesheetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    organizationId?: boolean
    projectId?: boolean
    user?: boolean | Timesheet$userArgs<ExtArgs>
    organization?: boolean | Timesheet$organizationArgs<ExtArgs>
    project?: boolean | Timesheet$projectArgs<ExtArgs>
  }, ExtArgs["result"]["timesheet"]>

  export type TimesheetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    organizationId?: boolean
    projectId?: boolean
    user?: boolean | Timesheet$userArgs<ExtArgs>
    organization?: boolean | Timesheet$organizationArgs<ExtArgs>
    project?: boolean | Timesheet$projectArgs<ExtArgs>
  }, ExtArgs["result"]["timesheet"]>

  export type TimesheetSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    organizationId?: boolean
    projectId?: boolean
  }

  export type TimesheetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "startDate" | "endDate" | "status" | "createdAt" | "updatedAt" | "userId" | "organizationId" | "projectId", ExtArgs["result"]["timesheet"]>
  export type TimesheetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Timesheet$userArgs<ExtArgs>
    organization?: boolean | Timesheet$organizationArgs<ExtArgs>
    entries?: boolean | Timesheet$entriesArgs<ExtArgs>
    project?: boolean | Timesheet$projectArgs<ExtArgs>
    _count?: boolean | TimesheetCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TimesheetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Timesheet$userArgs<ExtArgs>
    organization?: boolean | Timesheet$organizationArgs<ExtArgs>
    project?: boolean | Timesheet$projectArgs<ExtArgs>
  }
  export type TimesheetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Timesheet$userArgs<ExtArgs>
    organization?: boolean | Timesheet$organizationArgs<ExtArgs>
    project?: boolean | Timesheet$projectArgs<ExtArgs>
  }

  export type $TimesheetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Timesheet"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      organization: Prisma.$OrganizationPayload<ExtArgs> | null
      entries: Prisma.$TimesheetEntryPayload<ExtArgs>[]
      project: Prisma.$ProjectPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      startDate: Date
      endDate: Date | null
      status: string
      createdAt: Date
      updatedAt: Date
      userId: string | null
      organizationId: string | null
      projectId: string | null
    }, ExtArgs["result"]["timesheet"]>
    composites: {}
  }

  type TimesheetGetPayload<S extends boolean | null | undefined | TimesheetDefaultArgs> = $Result.GetResult<Prisma.$TimesheetPayload, S>

  type TimesheetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TimesheetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TimesheetCountAggregateInputType | true
    }

  export interface TimesheetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Timesheet'], meta: { name: 'Timesheet' } }
    /**
     * Find zero or one Timesheet that matches the filter.
     * @param {TimesheetFindUniqueArgs} args - Arguments to find a Timesheet
     * @example
     * // Get one Timesheet
     * const timesheet = await prisma.timesheet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TimesheetFindUniqueArgs>(args: SelectSubset<T, TimesheetFindUniqueArgs<ExtArgs>>): Prisma__TimesheetClient<$Result.GetResult<Prisma.$TimesheetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Timesheet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TimesheetFindUniqueOrThrowArgs} args - Arguments to find a Timesheet
     * @example
     * // Get one Timesheet
     * const timesheet = await prisma.timesheet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TimesheetFindUniqueOrThrowArgs>(args: SelectSubset<T, TimesheetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TimesheetClient<$Result.GetResult<Prisma.$TimesheetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Timesheet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimesheetFindFirstArgs} args - Arguments to find a Timesheet
     * @example
     * // Get one Timesheet
     * const timesheet = await prisma.timesheet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TimesheetFindFirstArgs>(args?: SelectSubset<T, TimesheetFindFirstArgs<ExtArgs>>): Prisma__TimesheetClient<$Result.GetResult<Prisma.$TimesheetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Timesheet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimesheetFindFirstOrThrowArgs} args - Arguments to find a Timesheet
     * @example
     * // Get one Timesheet
     * const timesheet = await prisma.timesheet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TimesheetFindFirstOrThrowArgs>(args?: SelectSubset<T, TimesheetFindFirstOrThrowArgs<ExtArgs>>): Prisma__TimesheetClient<$Result.GetResult<Prisma.$TimesheetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Timesheets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimesheetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Timesheets
     * const timesheets = await prisma.timesheet.findMany()
     * 
     * // Get first 10 Timesheets
     * const timesheets = await prisma.timesheet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const timesheetWithIdOnly = await prisma.timesheet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TimesheetFindManyArgs>(args?: SelectSubset<T, TimesheetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimesheetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Timesheet.
     * @param {TimesheetCreateArgs} args - Arguments to create a Timesheet.
     * @example
     * // Create one Timesheet
     * const Timesheet = await prisma.timesheet.create({
     *   data: {
     *     // ... data to create a Timesheet
     *   }
     * })
     * 
     */
    create<T extends TimesheetCreateArgs>(args: SelectSubset<T, TimesheetCreateArgs<ExtArgs>>): Prisma__TimesheetClient<$Result.GetResult<Prisma.$TimesheetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Timesheets.
     * @param {TimesheetCreateManyArgs} args - Arguments to create many Timesheets.
     * @example
     * // Create many Timesheets
     * const timesheet = await prisma.timesheet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TimesheetCreateManyArgs>(args?: SelectSubset<T, TimesheetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Timesheets and returns the data saved in the database.
     * @param {TimesheetCreateManyAndReturnArgs} args - Arguments to create many Timesheets.
     * @example
     * // Create many Timesheets
     * const timesheet = await prisma.timesheet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Timesheets and only return the `id`
     * const timesheetWithIdOnly = await prisma.timesheet.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TimesheetCreateManyAndReturnArgs>(args?: SelectSubset<T, TimesheetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimesheetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Timesheet.
     * @param {TimesheetDeleteArgs} args - Arguments to delete one Timesheet.
     * @example
     * // Delete one Timesheet
     * const Timesheet = await prisma.timesheet.delete({
     *   where: {
     *     // ... filter to delete one Timesheet
     *   }
     * })
     * 
     */
    delete<T extends TimesheetDeleteArgs>(args: SelectSubset<T, TimesheetDeleteArgs<ExtArgs>>): Prisma__TimesheetClient<$Result.GetResult<Prisma.$TimesheetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Timesheet.
     * @param {TimesheetUpdateArgs} args - Arguments to update one Timesheet.
     * @example
     * // Update one Timesheet
     * const timesheet = await prisma.timesheet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TimesheetUpdateArgs>(args: SelectSubset<T, TimesheetUpdateArgs<ExtArgs>>): Prisma__TimesheetClient<$Result.GetResult<Prisma.$TimesheetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Timesheets.
     * @param {TimesheetDeleteManyArgs} args - Arguments to filter Timesheets to delete.
     * @example
     * // Delete a few Timesheets
     * const { count } = await prisma.timesheet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TimesheetDeleteManyArgs>(args?: SelectSubset<T, TimesheetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Timesheets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimesheetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Timesheets
     * const timesheet = await prisma.timesheet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TimesheetUpdateManyArgs>(args: SelectSubset<T, TimesheetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Timesheets and returns the data updated in the database.
     * @param {TimesheetUpdateManyAndReturnArgs} args - Arguments to update many Timesheets.
     * @example
     * // Update many Timesheets
     * const timesheet = await prisma.timesheet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Timesheets and only return the `id`
     * const timesheetWithIdOnly = await prisma.timesheet.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TimesheetUpdateManyAndReturnArgs>(args: SelectSubset<T, TimesheetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimesheetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Timesheet.
     * @param {TimesheetUpsertArgs} args - Arguments to update or create a Timesheet.
     * @example
     * // Update or create a Timesheet
     * const timesheet = await prisma.timesheet.upsert({
     *   create: {
     *     // ... data to create a Timesheet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Timesheet we want to update
     *   }
     * })
     */
    upsert<T extends TimesheetUpsertArgs>(args: SelectSubset<T, TimesheetUpsertArgs<ExtArgs>>): Prisma__TimesheetClient<$Result.GetResult<Prisma.$TimesheetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Timesheets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimesheetCountArgs} args - Arguments to filter Timesheets to count.
     * @example
     * // Count the number of Timesheets
     * const count = await prisma.timesheet.count({
     *   where: {
     *     // ... the filter for the Timesheets we want to count
     *   }
     * })
    **/
    count<T extends TimesheetCountArgs>(
      args?: Subset<T, TimesheetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TimesheetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Timesheet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimesheetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TimesheetAggregateArgs>(args: Subset<T, TimesheetAggregateArgs>): Prisma.PrismaPromise<GetTimesheetAggregateType<T>>

    /**
     * Group by Timesheet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimesheetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TimesheetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TimesheetGroupByArgs['orderBy'] }
        : { orderBy?: TimesheetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TimesheetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTimesheetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Timesheet model
   */
  readonly fields: TimesheetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Timesheet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TimesheetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Timesheet$userArgs<ExtArgs> = {}>(args?: Subset<T, Timesheet$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    organization<T extends Timesheet$organizationArgs<ExtArgs> = {}>(args?: Subset<T, Timesheet$organizationArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    entries<T extends Timesheet$entriesArgs<ExtArgs> = {}>(args?: Subset<T, Timesheet$entriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimesheetEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    project<T extends Timesheet$projectArgs<ExtArgs> = {}>(args?: Subset<T, Timesheet$projectArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Timesheet model
   */
  interface TimesheetFieldRefs {
    readonly id: FieldRef<"Timesheet", 'String'>
    readonly name: FieldRef<"Timesheet", 'String'>
    readonly description: FieldRef<"Timesheet", 'String'>
    readonly startDate: FieldRef<"Timesheet", 'DateTime'>
    readonly endDate: FieldRef<"Timesheet", 'DateTime'>
    readonly status: FieldRef<"Timesheet", 'String'>
    readonly createdAt: FieldRef<"Timesheet", 'DateTime'>
    readonly updatedAt: FieldRef<"Timesheet", 'DateTime'>
    readonly userId: FieldRef<"Timesheet", 'String'>
    readonly organizationId: FieldRef<"Timesheet", 'String'>
    readonly projectId: FieldRef<"Timesheet", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Timesheet findUnique
   */
  export type TimesheetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timesheet
     */
    select?: TimesheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timesheet
     */
    omit?: TimesheetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimesheetInclude<ExtArgs> | null
    /**
     * Filter, which Timesheet to fetch.
     */
    where: TimesheetWhereUniqueInput
  }

  /**
   * Timesheet findUniqueOrThrow
   */
  export type TimesheetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timesheet
     */
    select?: TimesheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timesheet
     */
    omit?: TimesheetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimesheetInclude<ExtArgs> | null
    /**
     * Filter, which Timesheet to fetch.
     */
    where: TimesheetWhereUniqueInput
  }

  /**
   * Timesheet findFirst
   */
  export type TimesheetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timesheet
     */
    select?: TimesheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timesheet
     */
    omit?: TimesheetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimesheetInclude<ExtArgs> | null
    /**
     * Filter, which Timesheet to fetch.
     */
    where?: TimesheetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Timesheets to fetch.
     */
    orderBy?: TimesheetOrderByWithRelationInput | TimesheetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Timesheets.
     */
    cursor?: TimesheetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Timesheets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Timesheets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Timesheets.
     */
    distinct?: TimesheetScalarFieldEnum | TimesheetScalarFieldEnum[]
  }

  /**
   * Timesheet findFirstOrThrow
   */
  export type TimesheetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timesheet
     */
    select?: TimesheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timesheet
     */
    omit?: TimesheetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimesheetInclude<ExtArgs> | null
    /**
     * Filter, which Timesheet to fetch.
     */
    where?: TimesheetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Timesheets to fetch.
     */
    orderBy?: TimesheetOrderByWithRelationInput | TimesheetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Timesheets.
     */
    cursor?: TimesheetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Timesheets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Timesheets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Timesheets.
     */
    distinct?: TimesheetScalarFieldEnum | TimesheetScalarFieldEnum[]
  }

  /**
   * Timesheet findMany
   */
  export type TimesheetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timesheet
     */
    select?: TimesheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timesheet
     */
    omit?: TimesheetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimesheetInclude<ExtArgs> | null
    /**
     * Filter, which Timesheets to fetch.
     */
    where?: TimesheetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Timesheets to fetch.
     */
    orderBy?: TimesheetOrderByWithRelationInput | TimesheetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Timesheets.
     */
    cursor?: TimesheetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Timesheets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Timesheets.
     */
    skip?: number
    distinct?: TimesheetScalarFieldEnum | TimesheetScalarFieldEnum[]
  }

  /**
   * Timesheet create
   */
  export type TimesheetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timesheet
     */
    select?: TimesheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timesheet
     */
    omit?: TimesheetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimesheetInclude<ExtArgs> | null
    /**
     * The data needed to create a Timesheet.
     */
    data: XOR<TimesheetCreateInput, TimesheetUncheckedCreateInput>
  }

  /**
   * Timesheet createMany
   */
  export type TimesheetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Timesheets.
     */
    data: TimesheetCreateManyInput | TimesheetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Timesheet createManyAndReturn
   */
  export type TimesheetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timesheet
     */
    select?: TimesheetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Timesheet
     */
    omit?: TimesheetOmit<ExtArgs> | null
    /**
     * The data used to create many Timesheets.
     */
    data: TimesheetCreateManyInput | TimesheetCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimesheetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Timesheet update
   */
  export type TimesheetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timesheet
     */
    select?: TimesheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timesheet
     */
    omit?: TimesheetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimesheetInclude<ExtArgs> | null
    /**
     * The data needed to update a Timesheet.
     */
    data: XOR<TimesheetUpdateInput, TimesheetUncheckedUpdateInput>
    /**
     * Choose, which Timesheet to update.
     */
    where: TimesheetWhereUniqueInput
  }

  /**
   * Timesheet updateMany
   */
  export type TimesheetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Timesheets.
     */
    data: XOR<TimesheetUpdateManyMutationInput, TimesheetUncheckedUpdateManyInput>
    /**
     * Filter which Timesheets to update
     */
    where?: TimesheetWhereInput
    /**
     * Limit how many Timesheets to update.
     */
    limit?: number
  }

  /**
   * Timesheet updateManyAndReturn
   */
  export type TimesheetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timesheet
     */
    select?: TimesheetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Timesheet
     */
    omit?: TimesheetOmit<ExtArgs> | null
    /**
     * The data used to update Timesheets.
     */
    data: XOR<TimesheetUpdateManyMutationInput, TimesheetUncheckedUpdateManyInput>
    /**
     * Filter which Timesheets to update
     */
    where?: TimesheetWhereInput
    /**
     * Limit how many Timesheets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimesheetIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Timesheet upsert
   */
  export type TimesheetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timesheet
     */
    select?: TimesheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timesheet
     */
    omit?: TimesheetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimesheetInclude<ExtArgs> | null
    /**
     * The filter to search for the Timesheet to update in case it exists.
     */
    where: TimesheetWhereUniqueInput
    /**
     * In case the Timesheet found by the `where` argument doesn't exist, create a new Timesheet with this data.
     */
    create: XOR<TimesheetCreateInput, TimesheetUncheckedCreateInput>
    /**
     * In case the Timesheet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TimesheetUpdateInput, TimesheetUncheckedUpdateInput>
  }

  /**
   * Timesheet delete
   */
  export type TimesheetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timesheet
     */
    select?: TimesheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timesheet
     */
    omit?: TimesheetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimesheetInclude<ExtArgs> | null
    /**
     * Filter which Timesheet to delete.
     */
    where: TimesheetWhereUniqueInput
  }

  /**
   * Timesheet deleteMany
   */
  export type TimesheetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Timesheets to delete
     */
    where?: TimesheetWhereInput
    /**
     * Limit how many Timesheets to delete.
     */
    limit?: number
  }

  /**
   * Timesheet.user
   */
  export type Timesheet$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Timesheet.organization
   */
  export type Timesheet$organizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    where?: OrganizationWhereInput
  }

  /**
   * Timesheet.entries
   */
  export type Timesheet$entriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimesheetEntry
     */
    select?: TimesheetEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimesheetEntry
     */
    omit?: TimesheetEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimesheetEntryInclude<ExtArgs> | null
    where?: TimesheetEntryWhereInput
    orderBy?: TimesheetEntryOrderByWithRelationInput | TimesheetEntryOrderByWithRelationInput[]
    cursor?: TimesheetEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TimesheetEntryScalarFieldEnum | TimesheetEntryScalarFieldEnum[]
  }

  /**
   * Timesheet.project
   */
  export type Timesheet$projectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
  }

  /**
   * Timesheet without action
   */
  export type TimesheetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timesheet
     */
    select?: TimesheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timesheet
     */
    omit?: TimesheetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimesheetInclude<ExtArgs> | null
  }


  /**
   * Model TimesheetEntry
   */

  export type AggregateTimesheetEntry = {
    _count: TimesheetEntryCountAggregateOutputType | null
    _avg: TimesheetEntryAvgAggregateOutputType | null
    _sum: TimesheetEntrySumAggregateOutputType | null
    _min: TimesheetEntryMinAggregateOutputType | null
    _max: TimesheetEntryMaxAggregateOutputType | null
  }

  export type TimesheetEntryAvgAggregateOutputType = {
    duration: number | null
  }

  export type TimesheetEntrySumAggregateOutputType = {
    duration: number | null
  }

  export type TimesheetEntryMinAggregateOutputType = {
    id: string | null
    description: string | null
    startTime: Date | null
    endTime: Date | null
    duration: number | null
    createdAt: Date | null
    updatedAt: Date | null
    timesheetId: string | null
  }

  export type TimesheetEntryMaxAggregateOutputType = {
    id: string | null
    description: string | null
    startTime: Date | null
    endTime: Date | null
    duration: number | null
    createdAt: Date | null
    updatedAt: Date | null
    timesheetId: string | null
  }

  export type TimesheetEntryCountAggregateOutputType = {
    id: number
    description: number
    startTime: number
    endTime: number
    duration: number
    createdAt: number
    updatedAt: number
    timesheetId: number
    _all: number
  }


  export type TimesheetEntryAvgAggregateInputType = {
    duration?: true
  }

  export type TimesheetEntrySumAggregateInputType = {
    duration?: true
  }

  export type TimesheetEntryMinAggregateInputType = {
    id?: true
    description?: true
    startTime?: true
    endTime?: true
    duration?: true
    createdAt?: true
    updatedAt?: true
    timesheetId?: true
  }

  export type TimesheetEntryMaxAggregateInputType = {
    id?: true
    description?: true
    startTime?: true
    endTime?: true
    duration?: true
    createdAt?: true
    updatedAt?: true
    timesheetId?: true
  }

  export type TimesheetEntryCountAggregateInputType = {
    id?: true
    description?: true
    startTime?: true
    endTime?: true
    duration?: true
    createdAt?: true
    updatedAt?: true
    timesheetId?: true
    _all?: true
  }

  export type TimesheetEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimesheetEntry to aggregate.
     */
    where?: TimesheetEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimesheetEntries to fetch.
     */
    orderBy?: TimesheetEntryOrderByWithRelationInput | TimesheetEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TimesheetEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimesheetEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimesheetEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TimesheetEntries
    **/
    _count?: true | TimesheetEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TimesheetEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TimesheetEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TimesheetEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TimesheetEntryMaxAggregateInputType
  }

  export type GetTimesheetEntryAggregateType<T extends TimesheetEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateTimesheetEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTimesheetEntry[P]>
      : GetScalarType<T[P], AggregateTimesheetEntry[P]>
  }




  export type TimesheetEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimesheetEntryWhereInput
    orderBy?: TimesheetEntryOrderByWithAggregationInput | TimesheetEntryOrderByWithAggregationInput[]
    by: TimesheetEntryScalarFieldEnum[] | TimesheetEntryScalarFieldEnum
    having?: TimesheetEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TimesheetEntryCountAggregateInputType | true
    _avg?: TimesheetEntryAvgAggregateInputType
    _sum?: TimesheetEntrySumAggregateInputType
    _min?: TimesheetEntryMinAggregateInputType
    _max?: TimesheetEntryMaxAggregateInputType
  }

  export type TimesheetEntryGroupByOutputType = {
    id: string
    description: string
    startTime: Date
    endTime: Date
    duration: number
    createdAt: Date
    updatedAt: Date
    timesheetId: string
    _count: TimesheetEntryCountAggregateOutputType | null
    _avg: TimesheetEntryAvgAggregateOutputType | null
    _sum: TimesheetEntrySumAggregateOutputType | null
    _min: TimesheetEntryMinAggregateOutputType | null
    _max: TimesheetEntryMaxAggregateOutputType | null
  }

  type GetTimesheetEntryGroupByPayload<T extends TimesheetEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TimesheetEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TimesheetEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TimesheetEntryGroupByOutputType[P]>
            : GetScalarType<T[P], TimesheetEntryGroupByOutputType[P]>
        }
      >
    >


  export type TimesheetEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    startTime?: boolean
    endTime?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    timesheetId?: boolean
    timesheet?: boolean | TimesheetDefaultArgs<ExtArgs>
    expenses?: boolean | TimesheetEntry$expensesArgs<ExtArgs>
    _count?: boolean | TimesheetEntryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timesheetEntry"]>

  export type TimesheetEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    startTime?: boolean
    endTime?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    timesheetId?: boolean
    timesheet?: boolean | TimesheetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timesheetEntry"]>

  export type TimesheetEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    startTime?: boolean
    endTime?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    timesheetId?: boolean
    timesheet?: boolean | TimesheetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timesheetEntry"]>

  export type TimesheetEntrySelectScalar = {
    id?: boolean
    description?: boolean
    startTime?: boolean
    endTime?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    timesheetId?: boolean
  }

  export type TimesheetEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "description" | "startTime" | "endTime" | "duration" | "createdAt" | "updatedAt" | "timesheetId", ExtArgs["result"]["timesheetEntry"]>
  export type TimesheetEntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    timesheet?: boolean | TimesheetDefaultArgs<ExtArgs>
    expenses?: boolean | TimesheetEntry$expensesArgs<ExtArgs>
    _count?: boolean | TimesheetEntryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TimesheetEntryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    timesheet?: boolean | TimesheetDefaultArgs<ExtArgs>
  }
  export type TimesheetEntryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    timesheet?: boolean | TimesheetDefaultArgs<ExtArgs>
  }

  export type $TimesheetEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TimesheetEntry"
    objects: {
      timesheet: Prisma.$TimesheetPayload<ExtArgs>
      expenses: Prisma.$ExpensePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      description: string
      startTime: Date
      endTime: Date
      duration: number
      createdAt: Date
      updatedAt: Date
      timesheetId: string
    }, ExtArgs["result"]["timesheetEntry"]>
    composites: {}
  }

  type TimesheetEntryGetPayload<S extends boolean | null | undefined | TimesheetEntryDefaultArgs> = $Result.GetResult<Prisma.$TimesheetEntryPayload, S>

  type TimesheetEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TimesheetEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TimesheetEntryCountAggregateInputType | true
    }

  export interface TimesheetEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TimesheetEntry'], meta: { name: 'TimesheetEntry' } }
    /**
     * Find zero or one TimesheetEntry that matches the filter.
     * @param {TimesheetEntryFindUniqueArgs} args - Arguments to find a TimesheetEntry
     * @example
     * // Get one TimesheetEntry
     * const timesheetEntry = await prisma.timesheetEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TimesheetEntryFindUniqueArgs>(args: SelectSubset<T, TimesheetEntryFindUniqueArgs<ExtArgs>>): Prisma__TimesheetEntryClient<$Result.GetResult<Prisma.$TimesheetEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TimesheetEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TimesheetEntryFindUniqueOrThrowArgs} args - Arguments to find a TimesheetEntry
     * @example
     * // Get one TimesheetEntry
     * const timesheetEntry = await prisma.timesheetEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TimesheetEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, TimesheetEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TimesheetEntryClient<$Result.GetResult<Prisma.$TimesheetEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TimesheetEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimesheetEntryFindFirstArgs} args - Arguments to find a TimesheetEntry
     * @example
     * // Get one TimesheetEntry
     * const timesheetEntry = await prisma.timesheetEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TimesheetEntryFindFirstArgs>(args?: SelectSubset<T, TimesheetEntryFindFirstArgs<ExtArgs>>): Prisma__TimesheetEntryClient<$Result.GetResult<Prisma.$TimesheetEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TimesheetEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimesheetEntryFindFirstOrThrowArgs} args - Arguments to find a TimesheetEntry
     * @example
     * // Get one TimesheetEntry
     * const timesheetEntry = await prisma.timesheetEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TimesheetEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, TimesheetEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__TimesheetEntryClient<$Result.GetResult<Prisma.$TimesheetEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TimesheetEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimesheetEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TimesheetEntries
     * const timesheetEntries = await prisma.timesheetEntry.findMany()
     * 
     * // Get first 10 TimesheetEntries
     * const timesheetEntries = await prisma.timesheetEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const timesheetEntryWithIdOnly = await prisma.timesheetEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TimesheetEntryFindManyArgs>(args?: SelectSubset<T, TimesheetEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimesheetEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TimesheetEntry.
     * @param {TimesheetEntryCreateArgs} args - Arguments to create a TimesheetEntry.
     * @example
     * // Create one TimesheetEntry
     * const TimesheetEntry = await prisma.timesheetEntry.create({
     *   data: {
     *     // ... data to create a TimesheetEntry
     *   }
     * })
     * 
     */
    create<T extends TimesheetEntryCreateArgs>(args: SelectSubset<T, TimesheetEntryCreateArgs<ExtArgs>>): Prisma__TimesheetEntryClient<$Result.GetResult<Prisma.$TimesheetEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TimesheetEntries.
     * @param {TimesheetEntryCreateManyArgs} args - Arguments to create many TimesheetEntries.
     * @example
     * // Create many TimesheetEntries
     * const timesheetEntry = await prisma.timesheetEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TimesheetEntryCreateManyArgs>(args?: SelectSubset<T, TimesheetEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TimesheetEntries and returns the data saved in the database.
     * @param {TimesheetEntryCreateManyAndReturnArgs} args - Arguments to create many TimesheetEntries.
     * @example
     * // Create many TimesheetEntries
     * const timesheetEntry = await prisma.timesheetEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TimesheetEntries and only return the `id`
     * const timesheetEntryWithIdOnly = await prisma.timesheetEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TimesheetEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, TimesheetEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimesheetEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TimesheetEntry.
     * @param {TimesheetEntryDeleteArgs} args - Arguments to delete one TimesheetEntry.
     * @example
     * // Delete one TimesheetEntry
     * const TimesheetEntry = await prisma.timesheetEntry.delete({
     *   where: {
     *     // ... filter to delete one TimesheetEntry
     *   }
     * })
     * 
     */
    delete<T extends TimesheetEntryDeleteArgs>(args: SelectSubset<T, TimesheetEntryDeleteArgs<ExtArgs>>): Prisma__TimesheetEntryClient<$Result.GetResult<Prisma.$TimesheetEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TimesheetEntry.
     * @param {TimesheetEntryUpdateArgs} args - Arguments to update one TimesheetEntry.
     * @example
     * // Update one TimesheetEntry
     * const timesheetEntry = await prisma.timesheetEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TimesheetEntryUpdateArgs>(args: SelectSubset<T, TimesheetEntryUpdateArgs<ExtArgs>>): Prisma__TimesheetEntryClient<$Result.GetResult<Prisma.$TimesheetEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TimesheetEntries.
     * @param {TimesheetEntryDeleteManyArgs} args - Arguments to filter TimesheetEntries to delete.
     * @example
     * // Delete a few TimesheetEntries
     * const { count } = await prisma.timesheetEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TimesheetEntryDeleteManyArgs>(args?: SelectSubset<T, TimesheetEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimesheetEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimesheetEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TimesheetEntries
     * const timesheetEntry = await prisma.timesheetEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TimesheetEntryUpdateManyArgs>(args: SelectSubset<T, TimesheetEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimesheetEntries and returns the data updated in the database.
     * @param {TimesheetEntryUpdateManyAndReturnArgs} args - Arguments to update many TimesheetEntries.
     * @example
     * // Update many TimesheetEntries
     * const timesheetEntry = await prisma.timesheetEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TimesheetEntries and only return the `id`
     * const timesheetEntryWithIdOnly = await prisma.timesheetEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TimesheetEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, TimesheetEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimesheetEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TimesheetEntry.
     * @param {TimesheetEntryUpsertArgs} args - Arguments to update or create a TimesheetEntry.
     * @example
     * // Update or create a TimesheetEntry
     * const timesheetEntry = await prisma.timesheetEntry.upsert({
     *   create: {
     *     // ... data to create a TimesheetEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TimesheetEntry we want to update
     *   }
     * })
     */
    upsert<T extends TimesheetEntryUpsertArgs>(args: SelectSubset<T, TimesheetEntryUpsertArgs<ExtArgs>>): Prisma__TimesheetEntryClient<$Result.GetResult<Prisma.$TimesheetEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TimesheetEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimesheetEntryCountArgs} args - Arguments to filter TimesheetEntries to count.
     * @example
     * // Count the number of TimesheetEntries
     * const count = await prisma.timesheetEntry.count({
     *   where: {
     *     // ... the filter for the TimesheetEntries we want to count
     *   }
     * })
    **/
    count<T extends TimesheetEntryCountArgs>(
      args?: Subset<T, TimesheetEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TimesheetEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TimesheetEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimesheetEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TimesheetEntryAggregateArgs>(args: Subset<T, TimesheetEntryAggregateArgs>): Prisma.PrismaPromise<GetTimesheetEntryAggregateType<T>>

    /**
     * Group by TimesheetEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimesheetEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TimesheetEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TimesheetEntryGroupByArgs['orderBy'] }
        : { orderBy?: TimesheetEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TimesheetEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTimesheetEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TimesheetEntry model
   */
  readonly fields: TimesheetEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TimesheetEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TimesheetEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    timesheet<T extends TimesheetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TimesheetDefaultArgs<ExtArgs>>): Prisma__TimesheetClient<$Result.GetResult<Prisma.$TimesheetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    expenses<T extends TimesheetEntry$expensesArgs<ExtArgs> = {}>(args?: Subset<T, TimesheetEntry$expensesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TimesheetEntry model
   */
  interface TimesheetEntryFieldRefs {
    readonly id: FieldRef<"TimesheetEntry", 'String'>
    readonly description: FieldRef<"TimesheetEntry", 'String'>
    readonly startTime: FieldRef<"TimesheetEntry", 'DateTime'>
    readonly endTime: FieldRef<"TimesheetEntry", 'DateTime'>
    readonly duration: FieldRef<"TimesheetEntry", 'Float'>
    readonly createdAt: FieldRef<"TimesheetEntry", 'DateTime'>
    readonly updatedAt: FieldRef<"TimesheetEntry", 'DateTime'>
    readonly timesheetId: FieldRef<"TimesheetEntry", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TimesheetEntry findUnique
   */
  export type TimesheetEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimesheetEntry
     */
    select?: TimesheetEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimesheetEntry
     */
    omit?: TimesheetEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimesheetEntryInclude<ExtArgs> | null
    /**
     * Filter, which TimesheetEntry to fetch.
     */
    where: TimesheetEntryWhereUniqueInput
  }

  /**
   * TimesheetEntry findUniqueOrThrow
   */
  export type TimesheetEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimesheetEntry
     */
    select?: TimesheetEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimesheetEntry
     */
    omit?: TimesheetEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimesheetEntryInclude<ExtArgs> | null
    /**
     * Filter, which TimesheetEntry to fetch.
     */
    where: TimesheetEntryWhereUniqueInput
  }

  /**
   * TimesheetEntry findFirst
   */
  export type TimesheetEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimesheetEntry
     */
    select?: TimesheetEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimesheetEntry
     */
    omit?: TimesheetEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimesheetEntryInclude<ExtArgs> | null
    /**
     * Filter, which TimesheetEntry to fetch.
     */
    where?: TimesheetEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimesheetEntries to fetch.
     */
    orderBy?: TimesheetEntryOrderByWithRelationInput | TimesheetEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimesheetEntries.
     */
    cursor?: TimesheetEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimesheetEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimesheetEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimesheetEntries.
     */
    distinct?: TimesheetEntryScalarFieldEnum | TimesheetEntryScalarFieldEnum[]
  }

  /**
   * TimesheetEntry findFirstOrThrow
   */
  export type TimesheetEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimesheetEntry
     */
    select?: TimesheetEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimesheetEntry
     */
    omit?: TimesheetEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimesheetEntryInclude<ExtArgs> | null
    /**
     * Filter, which TimesheetEntry to fetch.
     */
    where?: TimesheetEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimesheetEntries to fetch.
     */
    orderBy?: TimesheetEntryOrderByWithRelationInput | TimesheetEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimesheetEntries.
     */
    cursor?: TimesheetEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimesheetEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimesheetEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimesheetEntries.
     */
    distinct?: TimesheetEntryScalarFieldEnum | TimesheetEntryScalarFieldEnum[]
  }

  /**
   * TimesheetEntry findMany
   */
  export type TimesheetEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimesheetEntry
     */
    select?: TimesheetEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimesheetEntry
     */
    omit?: TimesheetEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimesheetEntryInclude<ExtArgs> | null
    /**
     * Filter, which TimesheetEntries to fetch.
     */
    where?: TimesheetEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimesheetEntries to fetch.
     */
    orderBy?: TimesheetEntryOrderByWithRelationInput | TimesheetEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TimesheetEntries.
     */
    cursor?: TimesheetEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimesheetEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimesheetEntries.
     */
    skip?: number
    distinct?: TimesheetEntryScalarFieldEnum | TimesheetEntryScalarFieldEnum[]
  }

  /**
   * TimesheetEntry create
   */
  export type TimesheetEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimesheetEntry
     */
    select?: TimesheetEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimesheetEntry
     */
    omit?: TimesheetEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimesheetEntryInclude<ExtArgs> | null
    /**
     * The data needed to create a TimesheetEntry.
     */
    data: XOR<TimesheetEntryCreateInput, TimesheetEntryUncheckedCreateInput>
  }

  /**
   * TimesheetEntry createMany
   */
  export type TimesheetEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TimesheetEntries.
     */
    data: TimesheetEntryCreateManyInput | TimesheetEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TimesheetEntry createManyAndReturn
   */
  export type TimesheetEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimesheetEntry
     */
    select?: TimesheetEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TimesheetEntry
     */
    omit?: TimesheetEntryOmit<ExtArgs> | null
    /**
     * The data used to create many TimesheetEntries.
     */
    data: TimesheetEntryCreateManyInput | TimesheetEntryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimesheetEntryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TimesheetEntry update
   */
  export type TimesheetEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimesheetEntry
     */
    select?: TimesheetEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimesheetEntry
     */
    omit?: TimesheetEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimesheetEntryInclude<ExtArgs> | null
    /**
     * The data needed to update a TimesheetEntry.
     */
    data: XOR<TimesheetEntryUpdateInput, TimesheetEntryUncheckedUpdateInput>
    /**
     * Choose, which TimesheetEntry to update.
     */
    where: TimesheetEntryWhereUniqueInput
  }

  /**
   * TimesheetEntry updateMany
   */
  export type TimesheetEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TimesheetEntries.
     */
    data: XOR<TimesheetEntryUpdateManyMutationInput, TimesheetEntryUncheckedUpdateManyInput>
    /**
     * Filter which TimesheetEntries to update
     */
    where?: TimesheetEntryWhereInput
    /**
     * Limit how many TimesheetEntries to update.
     */
    limit?: number
  }

  /**
   * TimesheetEntry updateManyAndReturn
   */
  export type TimesheetEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimesheetEntry
     */
    select?: TimesheetEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TimesheetEntry
     */
    omit?: TimesheetEntryOmit<ExtArgs> | null
    /**
     * The data used to update TimesheetEntries.
     */
    data: XOR<TimesheetEntryUpdateManyMutationInput, TimesheetEntryUncheckedUpdateManyInput>
    /**
     * Filter which TimesheetEntries to update
     */
    where?: TimesheetEntryWhereInput
    /**
     * Limit how many TimesheetEntries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimesheetEntryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TimesheetEntry upsert
   */
  export type TimesheetEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimesheetEntry
     */
    select?: TimesheetEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimesheetEntry
     */
    omit?: TimesheetEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimesheetEntryInclude<ExtArgs> | null
    /**
     * The filter to search for the TimesheetEntry to update in case it exists.
     */
    where: TimesheetEntryWhereUniqueInput
    /**
     * In case the TimesheetEntry found by the `where` argument doesn't exist, create a new TimesheetEntry with this data.
     */
    create: XOR<TimesheetEntryCreateInput, TimesheetEntryUncheckedCreateInput>
    /**
     * In case the TimesheetEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TimesheetEntryUpdateInput, TimesheetEntryUncheckedUpdateInput>
  }

  /**
   * TimesheetEntry delete
   */
  export type TimesheetEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimesheetEntry
     */
    select?: TimesheetEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimesheetEntry
     */
    omit?: TimesheetEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimesheetEntryInclude<ExtArgs> | null
    /**
     * Filter which TimesheetEntry to delete.
     */
    where: TimesheetEntryWhereUniqueInput
  }

  /**
   * TimesheetEntry deleteMany
   */
  export type TimesheetEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimesheetEntries to delete
     */
    where?: TimesheetEntryWhereInput
    /**
     * Limit how many TimesheetEntries to delete.
     */
    limit?: number
  }

  /**
   * TimesheetEntry.expenses
   */
  export type TimesheetEntry$expensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    where?: ExpenseWhereInput
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    cursor?: ExpenseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * TimesheetEntry without action
   */
  export type TimesheetEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimesheetEntry
     */
    select?: TimesheetEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimesheetEntry
     */
    omit?: TimesheetEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimesheetEntryInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    startDate: Date | null
    endDate: Date | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    startDate: Date | null
    endDate: Date | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    name: number
    description: number
    startDate: number
    endDate: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    startDate?: true
    endDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    startDate?: true
    endDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    startDate?: true
    endDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    name: string
    description: string | null
    startDate: Date
    endDate: Date | null
    status: string
    createdAt: Date
    updatedAt: Date
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    budgets?: boolean | Project$budgetsArgs<ExtArgs>
    expenses?: boolean | Project$expensesArgs<ExtArgs>
    timesheets?: boolean | Project$timesheetsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "startDate" | "endDate" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    budgets?: boolean | Project$budgetsArgs<ExtArgs>
    expenses?: boolean | Project$expensesArgs<ExtArgs>
    timesheets?: boolean | Project$timesheetsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      budgets: Prisma.$BudgetPayload<ExtArgs>[]
      expenses: Prisma.$ExpensePayload<ExtArgs>[]
      timesheets: Prisma.$TimesheetPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      startDate: Date
      endDate: Date | null
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    budgets<T extends Project$budgetsArgs<ExtArgs> = {}>(args?: Subset<T, Project$budgetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    expenses<T extends Project$expensesArgs<ExtArgs> = {}>(args?: Subset<T, Project$expensesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    timesheets<T extends Project$timesheetsArgs<ExtArgs> = {}>(args?: Subset<T, Project$timesheetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimesheetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly name: FieldRef<"Project", 'String'>
    readonly description: FieldRef<"Project", 'String'>
    readonly startDate: FieldRef<"Project", 'DateTime'>
    readonly endDate: FieldRef<"Project", 'DateTime'>
    readonly status: FieldRef<"Project", 'String'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.budgets
   */
  export type Project$budgetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    where?: BudgetWhereInput
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[]
    cursor?: BudgetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BudgetScalarFieldEnum | BudgetScalarFieldEnum[]
  }

  /**
   * Project.expenses
   */
  export type Project$expensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    where?: ExpenseWhereInput
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    cursor?: ExpenseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Project.timesheets
   */
  export type Project$timesheetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timesheet
     */
    select?: TimesheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timesheet
     */
    omit?: TimesheetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimesheetInclude<ExtArgs> | null
    where?: TimesheetWhereInput
    orderBy?: TimesheetOrderByWithRelationInput | TimesheetOrderByWithRelationInput[]
    cursor?: TimesheetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TimesheetScalarFieldEnum | TimesheetScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model Subscription
   */

  export type AggregateSubscription = {
    _count: SubscriptionCountAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  export type SubscriptionMinAggregateOutputType = {
    id: string | null
    plan: string | null
    status: string | null
    startDate: Date | null
    endDate: Date | null
    trialEndsAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    organizationId: string | null
  }

  export type SubscriptionMaxAggregateOutputType = {
    id: string | null
    plan: string | null
    status: string | null
    startDate: Date | null
    endDate: Date | null
    trialEndsAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    organizationId: string | null
  }

  export type SubscriptionCountAggregateOutputType = {
    id: number
    plan: number
    status: number
    startDate: number
    endDate: number
    trialEndsAt: number
    createdAt: number
    updatedAt: number
    organizationId: number
    _all: number
  }


  export type SubscriptionMinAggregateInputType = {
    id?: true
    plan?: true
    status?: true
    startDate?: true
    endDate?: true
    trialEndsAt?: true
    createdAt?: true
    updatedAt?: true
    organizationId?: true
  }

  export type SubscriptionMaxAggregateInputType = {
    id?: true
    plan?: true
    status?: true
    startDate?: true
    endDate?: true
    trialEndsAt?: true
    createdAt?: true
    updatedAt?: true
    organizationId?: true
  }

  export type SubscriptionCountAggregateInputType = {
    id?: true
    plan?: true
    status?: true
    startDate?: true
    endDate?: true
    trialEndsAt?: true
    createdAt?: true
    updatedAt?: true
    organizationId?: true
    _all?: true
  }

  export type SubscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscription to aggregate.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subscriptions
    **/
    _count?: true | SubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriptionMaxAggregateInputType
  }

  export type GetSubscriptionAggregateType<T extends SubscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscription[P]>
      : GetScalarType<T[P], AggregateSubscription[P]>
  }




  export type SubscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithAggregationInput | SubscriptionOrderByWithAggregationInput[]
    by: SubscriptionScalarFieldEnum[] | SubscriptionScalarFieldEnum
    having?: SubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionCountAggregateInputType | true
    _min?: SubscriptionMinAggregateInputType
    _max?: SubscriptionMaxAggregateInputType
  }

  export type SubscriptionGroupByOutputType = {
    id: string
    plan: string
    status: string
    startDate: Date
    endDate: Date | null
    trialEndsAt: Date | null
    createdAt: Date
    updatedAt: Date
    organizationId: string
    _count: SubscriptionCountAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  type GetSubscriptionGroupByPayload<T extends SubscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
        }
      >
    >


  export type SubscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    plan?: boolean
    status?: boolean
    startDate?: boolean
    endDate?: boolean
    trialEndsAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organizationId?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    plan?: boolean
    status?: boolean
    startDate?: boolean
    endDate?: boolean
    trialEndsAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organizationId?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    plan?: boolean
    status?: boolean
    startDate?: boolean
    endDate?: boolean
    trialEndsAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organizationId?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectScalar = {
    id?: boolean
    plan?: boolean
    status?: boolean
    startDate?: boolean
    endDate?: boolean
    trialEndsAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organizationId?: boolean
  }

  export type SubscriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "plan" | "status" | "startDate" | "endDate" | "trialEndsAt" | "createdAt" | "updatedAt" | "organizationId", ExtArgs["result"]["subscription"]>
  export type SubscriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type SubscriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type SubscriptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $SubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subscription"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      plan: string
      status: string
      startDate: Date
      endDate: Date | null
      trialEndsAt: Date | null
      createdAt: Date
      updatedAt: Date
      organizationId: string
    }, ExtArgs["result"]["subscription"]>
    composites: {}
  }

  type SubscriptionGetPayload<S extends boolean | null | undefined | SubscriptionDefaultArgs> = $Result.GetResult<Prisma.$SubscriptionPayload, S>

  type SubscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscriptionCountAggregateInputType | true
    }

  export interface SubscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subscription'], meta: { name: 'Subscription' } }
    /**
     * Find zero or one Subscription that matches the filter.
     * @param {SubscriptionFindUniqueArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubscriptionFindUniqueArgs>(args: SelectSubset<T, SubscriptionFindUniqueArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subscription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubscriptionFindUniqueOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, SubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubscriptionFindFirstArgs>(args?: SelectSubset<T, SubscriptionFindFirstArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, SubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subscriptions
     * const subscriptions = await prisma.subscription.findMany()
     * 
     * // Get first 10 Subscriptions
     * const subscriptions = await prisma.subscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubscriptionFindManyArgs>(args?: SelectSubset<T, SubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subscription.
     * @param {SubscriptionCreateArgs} args - Arguments to create a Subscription.
     * @example
     * // Create one Subscription
     * const Subscription = await prisma.subscription.create({
     *   data: {
     *     // ... data to create a Subscription
     *   }
     * })
     * 
     */
    create<T extends SubscriptionCreateArgs>(args: SelectSubset<T, SubscriptionCreateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subscriptions.
     * @param {SubscriptionCreateManyArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubscriptionCreateManyArgs>(args?: SelectSubset<T, SubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subscriptions and returns the data saved in the database.
     * @param {SubscriptionCreateManyAndReturnArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subscriptions and only return the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubscriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, SubscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subscription.
     * @param {SubscriptionDeleteArgs} args - Arguments to delete one Subscription.
     * @example
     * // Delete one Subscription
     * const Subscription = await prisma.subscription.delete({
     *   where: {
     *     // ... filter to delete one Subscription
     *   }
     * })
     * 
     */
    delete<T extends SubscriptionDeleteArgs>(args: SelectSubset<T, SubscriptionDeleteArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subscription.
     * @param {SubscriptionUpdateArgs} args - Arguments to update one Subscription.
     * @example
     * // Update one Subscription
     * const subscription = await prisma.subscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubscriptionUpdateArgs>(args: SelectSubset<T, SubscriptionUpdateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subscriptions.
     * @param {SubscriptionDeleteManyArgs} args - Arguments to filter Subscriptions to delete.
     * @example
     * // Delete a few Subscriptions
     * const { count } = await prisma.subscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubscriptionDeleteManyArgs>(args?: SelectSubset<T, SubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubscriptionUpdateManyArgs>(args: SelectSubset<T, SubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions and returns the data updated in the database.
     * @param {SubscriptionUpdateManyAndReturnArgs} args - Arguments to update many Subscriptions.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subscriptions and only return the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubscriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, SubscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subscription.
     * @param {SubscriptionUpsertArgs} args - Arguments to update or create a Subscription.
     * @example
     * // Update or create a Subscription
     * const subscription = await prisma.subscription.upsert({
     *   create: {
     *     // ... data to create a Subscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subscription we want to update
     *   }
     * })
     */
    upsert<T extends SubscriptionUpsertArgs>(args: SelectSubset<T, SubscriptionUpsertArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCountArgs} args - Arguments to filter Subscriptions to count.
     * @example
     * // Count the number of Subscriptions
     * const count = await prisma.subscription.count({
     *   where: {
     *     // ... the filter for the Subscriptions we want to count
     *   }
     * })
    **/
    count<T extends SubscriptionCountArgs>(
      args?: Subset<T, SubscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubscriptionAggregateArgs>(args: Subset<T, SubscriptionAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionAggregateType<T>>

    /**
     * Group by Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: SubscriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subscription model
   */
  readonly fields: SubscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Subscription model
   */
  interface SubscriptionFieldRefs {
    readonly id: FieldRef<"Subscription", 'String'>
    readonly plan: FieldRef<"Subscription", 'String'>
    readonly status: FieldRef<"Subscription", 'String'>
    readonly startDate: FieldRef<"Subscription", 'DateTime'>
    readonly endDate: FieldRef<"Subscription", 'DateTime'>
    readonly trialEndsAt: FieldRef<"Subscription", 'DateTime'>
    readonly createdAt: FieldRef<"Subscription", 'DateTime'>
    readonly updatedAt: FieldRef<"Subscription", 'DateTime'>
    readonly organizationId: FieldRef<"Subscription", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Subscription findUnique
   */
  export type SubscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findUniqueOrThrow
   */
  export type SubscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findFirst
   */
  export type SubscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findFirstOrThrow
   */
  export type SubscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findMany
   */
  export type SubscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscriptions to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription create
   */
  export type SubscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a Subscription.
     */
    data: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
  }

  /**
   * Subscription createMany
   */
  export type SubscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subscription createManyAndReturn
   */
  export type SubscriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscription update
   */
  export type SubscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a Subscription.
     */
    data: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
    /**
     * Choose, which Subscription to update.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription updateMany
   */
  export type SubscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to update.
     */
    limit?: number
  }

  /**
   * Subscription updateManyAndReturn
   */
  export type SubscriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscription upsert
   */
  export type SubscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the Subscription to update in case it exists.
     */
    where: SubscriptionWhereUniqueInput
    /**
     * In case the Subscription found by the `where` argument doesn't exist, create a new Subscription with this data.
     */
    create: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
    /**
     * In case the Subscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
  }

  /**
   * Subscription delete
   */
  export type SubscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter which Subscription to delete.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription deleteMany
   */
  export type SubscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscriptions to delete
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to delete.
     */
    limit?: number
  }

  /**
   * Subscription without action
   */
  export type SubscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    title: string | null
    message: string | null
    isRead: boolean | null
    type: string | null
    createdAt: Date | null
    userId: string | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    title: string | null
    message: string | null
    isRead: boolean | null
    type: string | null
    createdAt: Date | null
    userId: string | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    title: number
    message: number
    isRead: number
    type: number
    createdAt: number
    userId: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    title?: true
    message?: true
    isRead?: true
    type?: true
    createdAt?: true
    userId?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    title?: true
    message?: true
    isRead?: true
    type?: true
    createdAt?: true
    userId?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    title?: true
    message?: true
    isRead?: true
    type?: true
    createdAt?: true
    userId?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    title: string
    message: string
    isRead: boolean
    type: string
    createdAt: Date
    userId: string
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    message?: boolean
    isRead?: boolean
    type?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    message?: boolean
    isRead?: boolean
    type?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    message?: boolean
    isRead?: boolean
    type?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    title?: boolean
    message?: boolean
    isRead?: boolean
    type?: boolean
    createdAt?: boolean
    userId?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "message" | "isRead" | "type" | "createdAt" | "userId", ExtArgs["result"]["notification"]>
  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      message: string
      isRead: boolean
      type: string
      createdAt: Date
      userId: string
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly isRead: FieldRef<"Notification", 'Boolean'>
    readonly type: FieldRef<"Notification", 'String'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
    readonly userId: FieldRef<"Notification", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    action: string | null
    entity: string | null
    entityId: string | null
    details: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
    userId: string | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    action: string | null
    entity: string | null
    entityId: string | null
    details: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
    userId: string | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    action: number
    entity: number
    entityId: number
    details: number
    ipAddress: number
    userAgent: number
    createdAt: number
    userId: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    action?: true
    entity?: true
    entityId?: true
    details?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    userId?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    action?: true
    entity?: true
    entityId?: true
    details?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    userId?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    action?: true
    entity?: true
    entityId?: true
    details?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    userId?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    action: string
    entity: string
    entityId: string
    details: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date
    userId: string
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    details?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    details?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    details?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    details?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    userId?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "action" | "entity" | "entityId" | "details" | "ipAddress" | "userAgent" | "createdAt" | "userId", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      action: string
      entity: string
      entityId: string
      details: string | null
      ipAddress: string | null
      userAgent: string | null
      createdAt: Date
      userId: string
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly entity: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'String'>
    readonly details: FieldRef<"AuditLog", 'String'>
    readonly ipAddress: FieldRef<"AuditLog", 'String'>
    readonly userAgent: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
    readonly userId: FieldRef<"AuditLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    username: 'username',
    passwordHash: 'passwordHash',
    firstName: 'firstName',
    lastName: 'lastName',
    role: 'role',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    profileImage: 'profileImage',
    phoneNumber: 'phoneNumber',
    resetToken: 'resetToken',
    resetTokenExpiry: 'resetTokenExpiry',
    organizationId: 'organizationId'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const OrganizationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    description: 'description',
    logo: 'logo',
    website: 'website',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isActive: 'isActive',
    ownerId: 'ownerId'
  };

  export type OrganizationScalarFieldEnum = (typeof OrganizationScalarFieldEnum)[keyof typeof OrganizationScalarFieldEnum]


  export const UserInvitationScalarFieldEnum: {
    id: 'id',
    email: 'email',
    token: 'token',
    status: 'status',
    role: 'role',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    organizationId: 'organizationId',
    userId: 'userId'
  };

  export type UserInvitationScalarFieldEnum = (typeof UserInvitationScalarFieldEnum)[keyof typeof UserInvitationScalarFieldEnum]


  export const BudgetScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    amount: 'amount',
    startDate: 'startDate',
    endDate: 'endDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    organizationId: 'organizationId',
    projectId: 'projectId'
  };

  export type BudgetScalarFieldEnum = (typeof BudgetScalarFieldEnum)[keyof typeof BudgetScalarFieldEnum]


  export const BudgetCategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    allocatedAmount: 'allocatedAmount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    budgetId: 'budgetId'
  };

  export type BudgetCategoryScalarFieldEnum = (typeof BudgetCategoryScalarFieldEnum)[keyof typeof BudgetCategoryScalarFieldEnum]


  export const ExpenseScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    amount: 'amount',
    date: 'date',
    receiptUrl: 'receiptUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    organizationId: 'organizationId',
    budgetId: 'budgetId',
    categoryId: 'categoryId',
    timesheetEntryId: 'timesheetEntryId',
    projectId: 'projectId'
  };

  export type ExpenseScalarFieldEnum = (typeof ExpenseScalarFieldEnum)[keyof typeof ExpenseScalarFieldEnum]


  export const TimesheetScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    startDate: 'startDate',
    endDate: 'endDate',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    organizationId: 'organizationId',
    projectId: 'projectId'
  };

  export type TimesheetScalarFieldEnum = (typeof TimesheetScalarFieldEnum)[keyof typeof TimesheetScalarFieldEnum]


  export const TimesheetEntryScalarFieldEnum: {
    id: 'id',
    description: 'description',
    startTime: 'startTime',
    endTime: 'endTime',
    duration: 'duration',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    timesheetId: 'timesheetId'
  };

  export type TimesheetEntryScalarFieldEnum = (typeof TimesheetEntryScalarFieldEnum)[keyof typeof TimesheetEntryScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    startDate: 'startDate',
    endDate: 'endDate',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const SubscriptionScalarFieldEnum: {
    id: 'id',
    plan: 'plan',
    status: 'status',
    startDate: 'startDate',
    endDate: 'endDate',
    trialEndsAt: 'trialEndsAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    organizationId: 'organizationId'
  };

  export type SubscriptionScalarFieldEnum = (typeof SubscriptionScalarFieldEnum)[keyof typeof SubscriptionScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    title: 'title',
    message: 'message',
    isRead: 'isRead',
    type: 'type',
    createdAt: 'createdAt',
    userId: 'userId'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    action: 'action',
    entity: 'entity',
    entityId: 'entityId',
    details: 'details',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    createdAt: 'createdAt',
    userId: 'userId'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'InvitationStatus'
   */
  export type EnumInvitationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InvitationStatus'>
    


  /**
   * Reference to a field of type 'InvitationStatus[]'
   */
  export type ListEnumInvitationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InvitationStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    username?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringFilter<"User"> | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    profileImage?: StringNullableFilter<"User"> | string | null
    phoneNumber?: StringNullableFilter<"User"> | string | null
    resetToken?: StringNullableFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    organizationId?: StringNullableFilter<"User"> | string | null
    organization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
    ownedOrganization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
    budgets?: BudgetListRelationFilter
    expenses?: ExpenseListRelationFilter
    timesheets?: TimesheetListRelationFilter
    invitations?: UserInvitationListRelationFilter
    notifications?: NotificationListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profileImage?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    resetToken?: SortOrderInput | SortOrder
    resetTokenExpiry?: SortOrderInput | SortOrder
    organizationId?: SortOrderInput | SortOrder
    organization?: OrganizationOrderByWithRelationInput
    ownedOrganization?: OrganizationOrderByWithRelationInput
    budgets?: BudgetOrderByRelationAggregateInput
    expenses?: ExpenseOrderByRelationAggregateInput
    timesheets?: TimesheetOrderByRelationAggregateInput
    invitations?: UserInvitationOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    username?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringFilter<"User"> | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    profileImage?: StringNullableFilter<"User"> | string | null
    phoneNumber?: StringNullableFilter<"User"> | string | null
    resetToken?: StringNullableFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    organizationId?: StringNullableFilter<"User"> | string | null
    organization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
    ownedOrganization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
    budgets?: BudgetListRelationFilter
    expenses?: ExpenseListRelationFilter
    timesheets?: TimesheetListRelationFilter
    invitations?: UserInvitationListRelationFilter
    notifications?: NotificationListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profileImage?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    resetToken?: SortOrderInput | SortOrder
    resetTokenExpiry?: SortOrderInput | SortOrder
    organizationId?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    username?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    profileImage?: StringNullableWithAggregatesFilter<"User"> | string | null
    phoneNumber?: StringNullableWithAggregatesFilter<"User"> | string | null
    resetToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    organizationId?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type OrganizationWhereInput = {
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    id?: StringFilter<"Organization"> | string
    name?: StringFilter<"Organization"> | string
    email?: StringNullableFilter<"Organization"> | string | null
    description?: StringNullableFilter<"Organization"> | string | null
    logo?: StringNullableFilter<"Organization"> | string | null
    website?: StringNullableFilter<"Organization"> | string | null
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeFilter<"Organization"> | Date | string
    isActive?: BoolFilter<"Organization"> | boolean
    ownerId?: StringNullableFilter<"Organization"> | string | null
    owner?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    members?: UserListRelationFilter
    invitations?: UserInvitationListRelationFilter
    budgets?: BudgetListRelationFilter
    expenses?: ExpenseListRelationFilter
    timesheets?: TimesheetListRelationFilter
    subscription?: XOR<SubscriptionNullableScalarRelationFilter, SubscriptionWhereInput> | null
  }

  export type OrganizationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    logo?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    ownerId?: SortOrderInput | SortOrder
    owner?: UserOrderByWithRelationInput
    members?: UserOrderByRelationAggregateInput
    invitations?: UserInvitationOrderByRelationAggregateInput
    budgets?: BudgetOrderByRelationAggregateInput
    expenses?: ExpenseOrderByRelationAggregateInput
    timesheets?: TimesheetOrderByRelationAggregateInput
    subscription?: SubscriptionOrderByWithRelationInput
  }

  export type OrganizationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    ownerId?: string
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    name?: StringFilter<"Organization"> | string
    description?: StringNullableFilter<"Organization"> | string | null
    logo?: StringNullableFilter<"Organization"> | string | null
    website?: StringNullableFilter<"Organization"> | string | null
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeFilter<"Organization"> | Date | string
    isActive?: BoolFilter<"Organization"> | boolean
    owner?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    members?: UserListRelationFilter
    invitations?: UserInvitationListRelationFilter
    budgets?: BudgetListRelationFilter
    expenses?: ExpenseListRelationFilter
    timesheets?: TimesheetListRelationFilter
    subscription?: XOR<SubscriptionNullableScalarRelationFilter, SubscriptionWhereInput> | null
  }, "id" | "email" | "ownerId">

  export type OrganizationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    logo?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    ownerId?: SortOrderInput | SortOrder
    _count?: OrganizationCountOrderByAggregateInput
    _max?: OrganizationMaxOrderByAggregateInput
    _min?: OrganizationMinOrderByAggregateInput
  }

  export type OrganizationScalarWhereWithAggregatesInput = {
    AND?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    OR?: OrganizationScalarWhereWithAggregatesInput[]
    NOT?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Organization"> | string
    name?: StringWithAggregatesFilter<"Organization"> | string
    email?: StringNullableWithAggregatesFilter<"Organization"> | string | null
    description?: StringNullableWithAggregatesFilter<"Organization"> | string | null
    logo?: StringNullableWithAggregatesFilter<"Organization"> | string | null
    website?: StringNullableWithAggregatesFilter<"Organization"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
    isActive?: BoolWithAggregatesFilter<"Organization"> | boolean
    ownerId?: StringNullableWithAggregatesFilter<"Organization"> | string | null
  }

  export type UserInvitationWhereInput = {
    AND?: UserInvitationWhereInput | UserInvitationWhereInput[]
    OR?: UserInvitationWhereInput[]
    NOT?: UserInvitationWhereInput | UserInvitationWhereInput[]
    id?: StringFilter<"UserInvitation"> | string
    email?: StringFilter<"UserInvitation"> | string
    token?: StringFilter<"UserInvitation"> | string
    status?: EnumInvitationStatusFilter<"UserInvitation"> | $Enums.InvitationStatus
    role?: EnumUserRoleFilter<"UserInvitation"> | $Enums.UserRole
    expiresAt?: DateTimeFilter<"UserInvitation"> | Date | string
    createdAt?: DateTimeFilter<"UserInvitation"> | Date | string
    organizationId?: StringFilter<"UserInvitation"> | string
    userId?: StringNullableFilter<"UserInvitation"> | string | null
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type UserInvitationOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    status?: SortOrder
    role?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    organizationId?: SortOrder
    userId?: SortOrderInput | SortOrder
    organization?: OrganizationOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type UserInvitationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: UserInvitationWhereInput | UserInvitationWhereInput[]
    OR?: UserInvitationWhereInput[]
    NOT?: UserInvitationWhereInput | UserInvitationWhereInput[]
    email?: StringFilter<"UserInvitation"> | string
    status?: EnumInvitationStatusFilter<"UserInvitation"> | $Enums.InvitationStatus
    role?: EnumUserRoleFilter<"UserInvitation"> | $Enums.UserRole
    expiresAt?: DateTimeFilter<"UserInvitation"> | Date | string
    createdAt?: DateTimeFilter<"UserInvitation"> | Date | string
    organizationId?: StringFilter<"UserInvitation"> | string
    userId?: StringNullableFilter<"UserInvitation"> | string | null
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id" | "token">

  export type UserInvitationOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    status?: SortOrder
    role?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    organizationId?: SortOrder
    userId?: SortOrderInput | SortOrder
    _count?: UserInvitationCountOrderByAggregateInput
    _max?: UserInvitationMaxOrderByAggregateInput
    _min?: UserInvitationMinOrderByAggregateInput
  }

  export type UserInvitationScalarWhereWithAggregatesInput = {
    AND?: UserInvitationScalarWhereWithAggregatesInput | UserInvitationScalarWhereWithAggregatesInput[]
    OR?: UserInvitationScalarWhereWithAggregatesInput[]
    NOT?: UserInvitationScalarWhereWithAggregatesInput | UserInvitationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserInvitation"> | string
    email?: StringWithAggregatesFilter<"UserInvitation"> | string
    token?: StringWithAggregatesFilter<"UserInvitation"> | string
    status?: EnumInvitationStatusWithAggregatesFilter<"UserInvitation"> | $Enums.InvitationStatus
    role?: EnumUserRoleWithAggregatesFilter<"UserInvitation"> | $Enums.UserRole
    expiresAt?: DateTimeWithAggregatesFilter<"UserInvitation"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"UserInvitation"> | Date | string
    organizationId?: StringWithAggregatesFilter<"UserInvitation"> | string
    userId?: StringNullableWithAggregatesFilter<"UserInvitation"> | string | null
  }

  export type BudgetWhereInput = {
    AND?: BudgetWhereInput | BudgetWhereInput[]
    OR?: BudgetWhereInput[]
    NOT?: BudgetWhereInput | BudgetWhereInput[]
    id?: StringFilter<"Budget"> | string
    name?: StringFilter<"Budget"> | string
    description?: StringNullableFilter<"Budget"> | string | null
    amount?: FloatFilter<"Budget"> | number
    startDate?: DateTimeFilter<"Budget"> | Date | string
    endDate?: DateTimeNullableFilter<"Budget"> | Date | string | null
    createdAt?: DateTimeFilter<"Budget"> | Date | string
    updatedAt?: DateTimeFilter<"Budget"> | Date | string
    userId?: StringNullableFilter<"Budget"> | string | null
    organizationId?: StringNullableFilter<"Budget"> | string | null
    projectId?: StringNullableFilter<"Budget"> | string | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    organization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
    categories?: BudgetCategoryListRelationFilter
    expenses?: ExpenseListRelationFilter
    project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
  }

  export type BudgetOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    amount?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrderInput | SortOrder
    organizationId?: SortOrderInput | SortOrder
    projectId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    organization?: OrganizationOrderByWithRelationInput
    categories?: BudgetCategoryOrderByRelationAggregateInput
    expenses?: ExpenseOrderByRelationAggregateInput
    project?: ProjectOrderByWithRelationInput
  }

  export type BudgetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BudgetWhereInput | BudgetWhereInput[]
    OR?: BudgetWhereInput[]
    NOT?: BudgetWhereInput | BudgetWhereInput[]
    name?: StringFilter<"Budget"> | string
    description?: StringNullableFilter<"Budget"> | string | null
    amount?: FloatFilter<"Budget"> | number
    startDate?: DateTimeFilter<"Budget"> | Date | string
    endDate?: DateTimeNullableFilter<"Budget"> | Date | string | null
    createdAt?: DateTimeFilter<"Budget"> | Date | string
    updatedAt?: DateTimeFilter<"Budget"> | Date | string
    userId?: StringNullableFilter<"Budget"> | string | null
    organizationId?: StringNullableFilter<"Budget"> | string | null
    projectId?: StringNullableFilter<"Budget"> | string | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    organization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
    categories?: BudgetCategoryListRelationFilter
    expenses?: ExpenseListRelationFilter
    project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
  }, "id">

  export type BudgetOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    amount?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrderInput | SortOrder
    organizationId?: SortOrderInput | SortOrder
    projectId?: SortOrderInput | SortOrder
    _count?: BudgetCountOrderByAggregateInput
    _avg?: BudgetAvgOrderByAggregateInput
    _max?: BudgetMaxOrderByAggregateInput
    _min?: BudgetMinOrderByAggregateInput
    _sum?: BudgetSumOrderByAggregateInput
  }

  export type BudgetScalarWhereWithAggregatesInput = {
    AND?: BudgetScalarWhereWithAggregatesInput | BudgetScalarWhereWithAggregatesInput[]
    OR?: BudgetScalarWhereWithAggregatesInput[]
    NOT?: BudgetScalarWhereWithAggregatesInput | BudgetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Budget"> | string
    name?: StringWithAggregatesFilter<"Budget"> | string
    description?: StringNullableWithAggregatesFilter<"Budget"> | string | null
    amount?: FloatWithAggregatesFilter<"Budget"> | number
    startDate?: DateTimeWithAggregatesFilter<"Budget"> | Date | string
    endDate?: DateTimeNullableWithAggregatesFilter<"Budget"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Budget"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Budget"> | Date | string
    userId?: StringNullableWithAggregatesFilter<"Budget"> | string | null
    organizationId?: StringNullableWithAggregatesFilter<"Budget"> | string | null
    projectId?: StringNullableWithAggregatesFilter<"Budget"> | string | null
  }

  export type BudgetCategoryWhereInput = {
    AND?: BudgetCategoryWhereInput | BudgetCategoryWhereInput[]
    OR?: BudgetCategoryWhereInput[]
    NOT?: BudgetCategoryWhereInput | BudgetCategoryWhereInput[]
    id?: StringFilter<"BudgetCategory"> | string
    name?: StringFilter<"BudgetCategory"> | string
    description?: StringNullableFilter<"BudgetCategory"> | string | null
    allocatedAmount?: FloatFilter<"BudgetCategory"> | number
    createdAt?: DateTimeFilter<"BudgetCategory"> | Date | string
    updatedAt?: DateTimeFilter<"BudgetCategory"> | Date | string
    budgetId?: StringFilter<"BudgetCategory"> | string
    budget?: XOR<BudgetScalarRelationFilter, BudgetWhereInput>
    expenses?: ExpenseListRelationFilter
  }

  export type BudgetCategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    allocatedAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    budgetId?: SortOrder
    budget?: BudgetOrderByWithRelationInput
    expenses?: ExpenseOrderByRelationAggregateInput
  }

  export type BudgetCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BudgetCategoryWhereInput | BudgetCategoryWhereInput[]
    OR?: BudgetCategoryWhereInput[]
    NOT?: BudgetCategoryWhereInput | BudgetCategoryWhereInput[]
    name?: StringFilter<"BudgetCategory"> | string
    description?: StringNullableFilter<"BudgetCategory"> | string | null
    allocatedAmount?: FloatFilter<"BudgetCategory"> | number
    createdAt?: DateTimeFilter<"BudgetCategory"> | Date | string
    updatedAt?: DateTimeFilter<"BudgetCategory"> | Date | string
    budgetId?: StringFilter<"BudgetCategory"> | string
    budget?: XOR<BudgetScalarRelationFilter, BudgetWhereInput>
    expenses?: ExpenseListRelationFilter
  }, "id">

  export type BudgetCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    allocatedAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    budgetId?: SortOrder
    _count?: BudgetCategoryCountOrderByAggregateInput
    _avg?: BudgetCategoryAvgOrderByAggregateInput
    _max?: BudgetCategoryMaxOrderByAggregateInput
    _min?: BudgetCategoryMinOrderByAggregateInput
    _sum?: BudgetCategorySumOrderByAggregateInput
  }

  export type BudgetCategoryScalarWhereWithAggregatesInput = {
    AND?: BudgetCategoryScalarWhereWithAggregatesInput | BudgetCategoryScalarWhereWithAggregatesInput[]
    OR?: BudgetCategoryScalarWhereWithAggregatesInput[]
    NOT?: BudgetCategoryScalarWhereWithAggregatesInput | BudgetCategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BudgetCategory"> | string
    name?: StringWithAggregatesFilter<"BudgetCategory"> | string
    description?: StringNullableWithAggregatesFilter<"BudgetCategory"> | string | null
    allocatedAmount?: FloatWithAggregatesFilter<"BudgetCategory"> | number
    createdAt?: DateTimeWithAggregatesFilter<"BudgetCategory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BudgetCategory"> | Date | string
    budgetId?: StringWithAggregatesFilter<"BudgetCategory"> | string
  }

  export type ExpenseWhereInput = {
    AND?: ExpenseWhereInput | ExpenseWhereInput[]
    OR?: ExpenseWhereInput[]
    NOT?: ExpenseWhereInput | ExpenseWhereInput[]
    id?: StringFilter<"Expense"> | string
    title?: StringFilter<"Expense"> | string
    description?: StringNullableFilter<"Expense"> | string | null
    amount?: FloatFilter<"Expense"> | number
    date?: DateTimeFilter<"Expense"> | Date | string
    receiptUrl?: StringNullableFilter<"Expense"> | string | null
    createdAt?: DateTimeFilter<"Expense"> | Date | string
    updatedAt?: DateTimeFilter<"Expense"> | Date | string
    userId?: StringNullableFilter<"Expense"> | string | null
    organizationId?: StringNullableFilter<"Expense"> | string | null
    budgetId?: StringNullableFilter<"Expense"> | string | null
    categoryId?: StringNullableFilter<"Expense"> | string | null
    timesheetEntryId?: StringNullableFilter<"Expense"> | string | null
    projectId?: StringNullableFilter<"Expense"> | string | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    organization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
    budget?: XOR<BudgetNullableScalarRelationFilter, BudgetWhereInput> | null
    category?: XOR<BudgetCategoryNullableScalarRelationFilter, BudgetCategoryWhereInput> | null
    timesheetEntry?: XOR<TimesheetEntryNullableScalarRelationFilter, TimesheetEntryWhereInput> | null
    project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
  }

  export type ExpenseOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    amount?: SortOrder
    date?: SortOrder
    receiptUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrderInput | SortOrder
    organizationId?: SortOrderInput | SortOrder
    budgetId?: SortOrderInput | SortOrder
    categoryId?: SortOrderInput | SortOrder
    timesheetEntryId?: SortOrderInput | SortOrder
    projectId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    organization?: OrganizationOrderByWithRelationInput
    budget?: BudgetOrderByWithRelationInput
    category?: BudgetCategoryOrderByWithRelationInput
    timesheetEntry?: TimesheetEntryOrderByWithRelationInput
    project?: ProjectOrderByWithRelationInput
  }

  export type ExpenseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExpenseWhereInput | ExpenseWhereInput[]
    OR?: ExpenseWhereInput[]
    NOT?: ExpenseWhereInput | ExpenseWhereInput[]
    title?: StringFilter<"Expense"> | string
    description?: StringNullableFilter<"Expense"> | string | null
    amount?: FloatFilter<"Expense"> | number
    date?: DateTimeFilter<"Expense"> | Date | string
    receiptUrl?: StringNullableFilter<"Expense"> | string | null
    createdAt?: DateTimeFilter<"Expense"> | Date | string
    updatedAt?: DateTimeFilter<"Expense"> | Date | string
    userId?: StringNullableFilter<"Expense"> | string | null
    organizationId?: StringNullableFilter<"Expense"> | string | null
    budgetId?: StringNullableFilter<"Expense"> | string | null
    categoryId?: StringNullableFilter<"Expense"> | string | null
    timesheetEntryId?: StringNullableFilter<"Expense"> | string | null
    projectId?: StringNullableFilter<"Expense"> | string | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    organization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
    budget?: XOR<BudgetNullableScalarRelationFilter, BudgetWhereInput> | null
    category?: XOR<BudgetCategoryNullableScalarRelationFilter, BudgetCategoryWhereInput> | null
    timesheetEntry?: XOR<TimesheetEntryNullableScalarRelationFilter, TimesheetEntryWhereInput> | null
    project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
  }, "id">

  export type ExpenseOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    amount?: SortOrder
    date?: SortOrder
    receiptUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrderInput | SortOrder
    organizationId?: SortOrderInput | SortOrder
    budgetId?: SortOrderInput | SortOrder
    categoryId?: SortOrderInput | SortOrder
    timesheetEntryId?: SortOrderInput | SortOrder
    projectId?: SortOrderInput | SortOrder
    _count?: ExpenseCountOrderByAggregateInput
    _avg?: ExpenseAvgOrderByAggregateInput
    _max?: ExpenseMaxOrderByAggregateInput
    _min?: ExpenseMinOrderByAggregateInput
    _sum?: ExpenseSumOrderByAggregateInput
  }

  export type ExpenseScalarWhereWithAggregatesInput = {
    AND?: ExpenseScalarWhereWithAggregatesInput | ExpenseScalarWhereWithAggregatesInput[]
    OR?: ExpenseScalarWhereWithAggregatesInput[]
    NOT?: ExpenseScalarWhereWithAggregatesInput | ExpenseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Expense"> | string
    title?: StringWithAggregatesFilter<"Expense"> | string
    description?: StringNullableWithAggregatesFilter<"Expense"> | string | null
    amount?: FloatWithAggregatesFilter<"Expense"> | number
    date?: DateTimeWithAggregatesFilter<"Expense"> | Date | string
    receiptUrl?: StringNullableWithAggregatesFilter<"Expense"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Expense"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Expense"> | Date | string
    userId?: StringNullableWithAggregatesFilter<"Expense"> | string | null
    organizationId?: StringNullableWithAggregatesFilter<"Expense"> | string | null
    budgetId?: StringNullableWithAggregatesFilter<"Expense"> | string | null
    categoryId?: StringNullableWithAggregatesFilter<"Expense"> | string | null
    timesheetEntryId?: StringNullableWithAggregatesFilter<"Expense"> | string | null
    projectId?: StringNullableWithAggregatesFilter<"Expense"> | string | null
  }

  export type TimesheetWhereInput = {
    AND?: TimesheetWhereInput | TimesheetWhereInput[]
    OR?: TimesheetWhereInput[]
    NOT?: TimesheetWhereInput | TimesheetWhereInput[]
    id?: StringFilter<"Timesheet"> | string
    name?: StringFilter<"Timesheet"> | string
    description?: StringNullableFilter<"Timesheet"> | string | null
    startDate?: DateTimeFilter<"Timesheet"> | Date | string
    endDate?: DateTimeNullableFilter<"Timesheet"> | Date | string | null
    status?: StringFilter<"Timesheet"> | string
    createdAt?: DateTimeFilter<"Timesheet"> | Date | string
    updatedAt?: DateTimeFilter<"Timesheet"> | Date | string
    userId?: StringNullableFilter<"Timesheet"> | string | null
    organizationId?: StringNullableFilter<"Timesheet"> | string | null
    projectId?: StringNullableFilter<"Timesheet"> | string | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    organization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
    entries?: TimesheetEntryListRelationFilter
    project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
  }

  export type TimesheetOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrderInput | SortOrder
    organizationId?: SortOrderInput | SortOrder
    projectId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    organization?: OrganizationOrderByWithRelationInput
    entries?: TimesheetEntryOrderByRelationAggregateInput
    project?: ProjectOrderByWithRelationInput
  }

  export type TimesheetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TimesheetWhereInput | TimesheetWhereInput[]
    OR?: TimesheetWhereInput[]
    NOT?: TimesheetWhereInput | TimesheetWhereInput[]
    name?: StringFilter<"Timesheet"> | string
    description?: StringNullableFilter<"Timesheet"> | string | null
    startDate?: DateTimeFilter<"Timesheet"> | Date | string
    endDate?: DateTimeNullableFilter<"Timesheet"> | Date | string | null
    status?: StringFilter<"Timesheet"> | string
    createdAt?: DateTimeFilter<"Timesheet"> | Date | string
    updatedAt?: DateTimeFilter<"Timesheet"> | Date | string
    userId?: StringNullableFilter<"Timesheet"> | string | null
    organizationId?: StringNullableFilter<"Timesheet"> | string | null
    projectId?: StringNullableFilter<"Timesheet"> | string | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    organization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
    entries?: TimesheetEntryListRelationFilter
    project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
  }, "id">

  export type TimesheetOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrderInput | SortOrder
    organizationId?: SortOrderInput | SortOrder
    projectId?: SortOrderInput | SortOrder
    _count?: TimesheetCountOrderByAggregateInput
    _max?: TimesheetMaxOrderByAggregateInput
    _min?: TimesheetMinOrderByAggregateInput
  }

  export type TimesheetScalarWhereWithAggregatesInput = {
    AND?: TimesheetScalarWhereWithAggregatesInput | TimesheetScalarWhereWithAggregatesInput[]
    OR?: TimesheetScalarWhereWithAggregatesInput[]
    NOT?: TimesheetScalarWhereWithAggregatesInput | TimesheetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Timesheet"> | string
    name?: StringWithAggregatesFilter<"Timesheet"> | string
    description?: StringNullableWithAggregatesFilter<"Timesheet"> | string | null
    startDate?: DateTimeWithAggregatesFilter<"Timesheet"> | Date | string
    endDate?: DateTimeNullableWithAggregatesFilter<"Timesheet"> | Date | string | null
    status?: StringWithAggregatesFilter<"Timesheet"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Timesheet"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Timesheet"> | Date | string
    userId?: StringNullableWithAggregatesFilter<"Timesheet"> | string | null
    organizationId?: StringNullableWithAggregatesFilter<"Timesheet"> | string | null
    projectId?: StringNullableWithAggregatesFilter<"Timesheet"> | string | null
  }

  export type TimesheetEntryWhereInput = {
    AND?: TimesheetEntryWhereInput | TimesheetEntryWhereInput[]
    OR?: TimesheetEntryWhereInput[]
    NOT?: TimesheetEntryWhereInput | TimesheetEntryWhereInput[]
    id?: StringFilter<"TimesheetEntry"> | string
    description?: StringFilter<"TimesheetEntry"> | string
    startTime?: DateTimeFilter<"TimesheetEntry"> | Date | string
    endTime?: DateTimeFilter<"TimesheetEntry"> | Date | string
    duration?: FloatFilter<"TimesheetEntry"> | number
    createdAt?: DateTimeFilter<"TimesheetEntry"> | Date | string
    updatedAt?: DateTimeFilter<"TimesheetEntry"> | Date | string
    timesheetId?: StringFilter<"TimesheetEntry"> | string
    timesheet?: XOR<TimesheetScalarRelationFilter, TimesheetWhereInput>
    expenses?: ExpenseListRelationFilter
  }

  export type TimesheetEntryOrderByWithRelationInput = {
    id?: SortOrder
    description?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    timesheetId?: SortOrder
    timesheet?: TimesheetOrderByWithRelationInput
    expenses?: ExpenseOrderByRelationAggregateInput
  }

  export type TimesheetEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TimesheetEntryWhereInput | TimesheetEntryWhereInput[]
    OR?: TimesheetEntryWhereInput[]
    NOT?: TimesheetEntryWhereInput | TimesheetEntryWhereInput[]
    description?: StringFilter<"TimesheetEntry"> | string
    startTime?: DateTimeFilter<"TimesheetEntry"> | Date | string
    endTime?: DateTimeFilter<"TimesheetEntry"> | Date | string
    duration?: FloatFilter<"TimesheetEntry"> | number
    createdAt?: DateTimeFilter<"TimesheetEntry"> | Date | string
    updatedAt?: DateTimeFilter<"TimesheetEntry"> | Date | string
    timesheetId?: StringFilter<"TimesheetEntry"> | string
    timesheet?: XOR<TimesheetScalarRelationFilter, TimesheetWhereInput>
    expenses?: ExpenseListRelationFilter
  }, "id">

  export type TimesheetEntryOrderByWithAggregationInput = {
    id?: SortOrder
    description?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    timesheetId?: SortOrder
    _count?: TimesheetEntryCountOrderByAggregateInput
    _avg?: TimesheetEntryAvgOrderByAggregateInput
    _max?: TimesheetEntryMaxOrderByAggregateInput
    _min?: TimesheetEntryMinOrderByAggregateInput
    _sum?: TimesheetEntrySumOrderByAggregateInput
  }

  export type TimesheetEntryScalarWhereWithAggregatesInput = {
    AND?: TimesheetEntryScalarWhereWithAggregatesInput | TimesheetEntryScalarWhereWithAggregatesInput[]
    OR?: TimesheetEntryScalarWhereWithAggregatesInput[]
    NOT?: TimesheetEntryScalarWhereWithAggregatesInput | TimesheetEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TimesheetEntry"> | string
    description?: StringWithAggregatesFilter<"TimesheetEntry"> | string
    startTime?: DateTimeWithAggregatesFilter<"TimesheetEntry"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"TimesheetEntry"> | Date | string
    duration?: FloatWithAggregatesFilter<"TimesheetEntry"> | number
    createdAt?: DateTimeWithAggregatesFilter<"TimesheetEntry"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TimesheetEntry"> | Date | string
    timesheetId?: StringWithAggregatesFilter<"TimesheetEntry"> | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    startDate?: DateTimeFilter<"Project"> | Date | string
    endDate?: DateTimeNullableFilter<"Project"> | Date | string | null
    status?: StringFilter<"Project"> | string
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    budgets?: BudgetListRelationFilter
    expenses?: ExpenseListRelationFilter
    timesheets?: TimesheetListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    budgets?: BudgetOrderByRelationAggregateInput
    expenses?: ExpenseOrderByRelationAggregateInput
    timesheets?: TimesheetOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    startDate?: DateTimeFilter<"Project"> | Date | string
    endDate?: DateTimeNullableFilter<"Project"> | Date | string | null
    status?: StringFilter<"Project"> | string
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    budgets?: BudgetListRelationFilter
    expenses?: ExpenseListRelationFilter
    timesheets?: TimesheetListRelationFilter
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    name?: StringWithAggregatesFilter<"Project"> | string
    description?: StringNullableWithAggregatesFilter<"Project"> | string | null
    startDate?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    endDate?: DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null
    status?: StringWithAggregatesFilter<"Project"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
  }

  export type SubscriptionWhereInput = {
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    id?: StringFilter<"Subscription"> | string
    plan?: StringFilter<"Subscription"> | string
    status?: StringFilter<"Subscription"> | string
    startDate?: DateTimeFilter<"Subscription"> | Date | string
    endDate?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    trialEndsAt?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    organizationId?: StringFilter<"Subscription"> | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
  }

  export type SubscriptionOrderByWithRelationInput = {
    id?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    trialEndsAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizationId?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
  }

  export type SubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    organizationId?: string
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    plan?: StringFilter<"Subscription"> | string
    status?: StringFilter<"Subscription"> | string
    startDate?: DateTimeFilter<"Subscription"> | Date | string
    endDate?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    trialEndsAt?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
  }, "id" | "organizationId">

  export type SubscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    trialEndsAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizationId?: SortOrder
    _count?: SubscriptionCountOrderByAggregateInput
    _max?: SubscriptionMaxOrderByAggregateInput
    _min?: SubscriptionMinOrderByAggregateInput
  }

  export type SubscriptionScalarWhereWithAggregatesInput = {
    AND?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    OR?: SubscriptionScalarWhereWithAggregatesInput[]
    NOT?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Subscription"> | string
    plan?: StringWithAggregatesFilter<"Subscription"> | string
    status?: StringWithAggregatesFilter<"Subscription"> | string
    startDate?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    endDate?: DateTimeNullableWithAggregatesFilter<"Subscription"> | Date | string | null
    trialEndsAt?: DateTimeNullableWithAggregatesFilter<"Subscription"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    organizationId?: StringWithAggregatesFilter<"Subscription"> | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    isRead?: BoolFilter<"Notification"> | boolean
    type?: StringFilter<"Notification"> | string
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    userId?: StringFilter<"Notification"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    isRead?: BoolFilter<"Notification"> | boolean
    type?: StringFilter<"Notification"> | string
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    userId?: StringFilter<"Notification"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    title?: StringWithAggregatesFilter<"Notification"> | string
    message?: StringWithAggregatesFilter<"Notification"> | string
    isRead?: BoolWithAggregatesFilter<"Notification"> | boolean
    type?: StringWithAggregatesFilter<"Notification"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
    userId?: StringWithAggregatesFilter<"Notification"> | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    entity?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    details?: StringNullableFilter<"AuditLog"> | string | null
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    userId?: StringFilter<"AuditLog"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    details?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    action?: StringFilter<"AuditLog"> | string
    entity?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    details?: StringNullableFilter<"AuditLog"> | string | null
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    userId?: StringFilter<"AuditLog"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    details?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    entity?: StringWithAggregatesFilter<"AuditLog"> | string
    entityId?: StringWithAggregatesFilter<"AuditLog"> | string
    details?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
    userId?: StringWithAggregatesFilter<"AuditLog"> | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    username?: string | null
    passwordHash: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profileImage?: string | null
    phoneNumber?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    organization?: OrganizationCreateNestedOneWithoutMembersInput
    ownedOrganization?: OrganizationCreateNestedOneWithoutOwnerInput
    budgets?: BudgetCreateNestedManyWithoutUserInput
    expenses?: ExpenseCreateNestedManyWithoutUserInput
    timesheets?: TimesheetCreateNestedManyWithoutUserInput
    invitations?: UserInvitationCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    username?: string | null
    passwordHash: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profileImage?: string | null
    phoneNumber?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    organizationId?: string | null
    ownedOrganization?: OrganizationUncheckedCreateNestedOneWithoutOwnerInput
    budgets?: BudgetUncheckedCreateNestedManyWithoutUserInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutUserInput
    timesheets?: TimesheetUncheckedCreateNestedManyWithoutUserInput
    invitations?: UserInvitationUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organization?: OrganizationUpdateOneWithoutMembersNestedInput
    ownedOrganization?: OrganizationUpdateOneWithoutOwnerNestedInput
    budgets?: BudgetUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUpdateManyWithoutUserNestedInput
    timesheets?: TimesheetUpdateManyWithoutUserNestedInput
    invitations?: UserInvitationUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    ownedOrganization?: OrganizationUncheckedUpdateOneWithoutOwnerNestedInput
    budgets?: BudgetUncheckedUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutUserNestedInput
    timesheets?: TimesheetUncheckedUpdateManyWithoutUserNestedInput
    invitations?: UserInvitationUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    username?: string | null
    passwordHash: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profileImage?: string | null
    phoneNumber?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    organizationId?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrganizationCreateInput = {
    id?: string
    name: string
    email?: string | null
    description?: string | null
    logo?: string | null
    website?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    owner?: UserCreateNestedOneWithoutOwnedOrganizationInput
    members?: UserCreateNestedManyWithoutOrganizationInput
    invitations?: UserInvitationCreateNestedManyWithoutOrganizationInput
    budgets?: BudgetCreateNestedManyWithoutOrganizationInput
    expenses?: ExpenseCreateNestedManyWithoutOrganizationInput
    timesheets?: TimesheetCreateNestedManyWithoutOrganizationInput
    subscription?: SubscriptionCreateNestedOneWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateInput = {
    id?: string
    name: string
    email?: string | null
    description?: string | null
    logo?: string | null
    website?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    ownerId?: string | null
    members?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    invitations?: UserInvitationUncheckedCreateNestedManyWithoutOrganizationInput
    budgets?: BudgetUncheckedCreateNestedManyWithoutOrganizationInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutOrganizationInput
    timesheets?: TimesheetUncheckedCreateNestedManyWithoutOrganizationInput
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutOrganizationInput
  }

  export type OrganizationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    owner?: UserUpdateOneWithoutOwnedOrganizationNestedInput
    members?: UserUpdateManyWithoutOrganizationNestedInput
    invitations?: UserInvitationUpdateManyWithoutOrganizationNestedInput
    budgets?: BudgetUpdateManyWithoutOrganizationNestedInput
    expenses?: ExpenseUpdateManyWithoutOrganizationNestedInput
    timesheets?: TimesheetUpdateManyWithoutOrganizationNestedInput
    subscription?: SubscriptionUpdateOneWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    members?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    invitations?: UserInvitationUncheckedUpdateManyWithoutOrganizationNestedInput
    budgets?: BudgetUncheckedUpdateManyWithoutOrganizationNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutOrganizationNestedInput
    timesheets?: TimesheetUncheckedUpdateManyWithoutOrganizationNestedInput
    subscription?: SubscriptionUncheckedUpdateOneWithoutOrganizationNestedInput
  }

  export type OrganizationCreateManyInput = {
    id?: string
    name: string
    email?: string | null
    description?: string | null
    logo?: string | null
    website?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    ownerId?: string | null
  }

  export type OrganizationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OrganizationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserInvitationCreateInput = {
    id?: string
    email: string
    token: string
    status?: $Enums.InvitationStatus
    role?: $Enums.UserRole
    expiresAt: Date | string
    createdAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutInvitationsInput
    user?: UserCreateNestedOneWithoutInvitationsInput
  }

  export type UserInvitationUncheckedCreateInput = {
    id?: string
    email: string
    token: string
    status?: $Enums.InvitationStatus
    role?: $Enums.UserRole
    expiresAt: Date | string
    createdAt?: Date | string
    organizationId: string
    userId?: string | null
  }

  export type UserInvitationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutInvitationsNestedInput
    user?: UserUpdateOneWithoutInvitationsNestedInput
  }

  export type UserInvitationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserInvitationCreateManyInput = {
    id?: string
    email: string
    token: string
    status?: $Enums.InvitationStatus
    role?: $Enums.UserRole
    expiresAt: Date | string
    createdAt?: Date | string
    organizationId: string
    userId?: string | null
  }

  export type UserInvitationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserInvitationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BudgetCreateInput = {
    id?: string
    name: string
    description?: string | null
    amount: number
    startDate: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutBudgetsInput
    organization?: OrganizationCreateNestedOneWithoutBudgetsInput
    categories?: BudgetCategoryCreateNestedManyWithoutBudgetInput
    expenses?: ExpenseCreateNestedManyWithoutBudgetInput
    project?: ProjectCreateNestedOneWithoutBudgetsInput
  }

  export type BudgetUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    amount: number
    startDate: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    organizationId?: string | null
    projectId?: string | null
    categories?: BudgetCategoryUncheckedCreateNestedManyWithoutBudgetInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutBudgetInput
  }

  export type BudgetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutBudgetsNestedInput
    organization?: OrganizationUpdateOneWithoutBudgetsNestedInput
    categories?: BudgetCategoryUpdateManyWithoutBudgetNestedInput
    expenses?: ExpenseUpdateManyWithoutBudgetNestedInput
    project?: ProjectUpdateOneWithoutBudgetsNestedInput
  }

  export type BudgetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    categories?: BudgetCategoryUncheckedUpdateManyWithoutBudgetNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutBudgetNestedInput
  }

  export type BudgetCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    amount: number
    startDate: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    organizationId?: string | null
    projectId?: string | null
  }

  export type BudgetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BudgetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BudgetCategoryCreateInput = {
    id?: string
    name: string
    description?: string | null
    allocatedAmount: number
    createdAt?: Date | string
    updatedAt?: Date | string
    budget: BudgetCreateNestedOneWithoutCategoriesInput
    expenses?: ExpenseCreateNestedManyWithoutCategoryInput
  }

  export type BudgetCategoryUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    allocatedAmount: number
    createdAt?: Date | string
    updatedAt?: Date | string
    budgetId: string
    expenses?: ExpenseUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type BudgetCategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    allocatedAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budget?: BudgetUpdateOneRequiredWithoutCategoriesNestedInput
    expenses?: ExpenseUpdateManyWithoutCategoryNestedInput
  }

  export type BudgetCategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    allocatedAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgetId?: StringFieldUpdateOperationsInput | string
    expenses?: ExpenseUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type BudgetCategoryCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    allocatedAmount: number
    createdAt?: Date | string
    updatedAt?: Date | string
    budgetId: string
  }

  export type BudgetCategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    allocatedAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BudgetCategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    allocatedAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgetId?: StringFieldUpdateOperationsInput | string
  }

  export type ExpenseCreateInput = {
    id?: string
    title: string
    description?: string | null
    amount: number
    date: Date | string
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutExpensesInput
    organization?: OrganizationCreateNestedOneWithoutExpensesInput
    budget?: BudgetCreateNestedOneWithoutExpensesInput
    category?: BudgetCategoryCreateNestedOneWithoutExpensesInput
    timesheetEntry?: TimesheetEntryCreateNestedOneWithoutExpensesInput
    project?: ProjectCreateNestedOneWithoutExpensesInput
  }

  export type ExpenseUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    amount: number
    date: Date | string
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    organizationId?: string | null
    budgetId?: string | null
    categoryId?: string | null
    timesheetEntryId?: string | null
    projectId?: string | null
  }

  export type ExpenseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutExpensesNestedInput
    organization?: OrganizationUpdateOneWithoutExpensesNestedInput
    budget?: BudgetUpdateOneWithoutExpensesNestedInput
    category?: BudgetCategoryUpdateOneWithoutExpensesNestedInput
    timesheetEntry?: TimesheetEntryUpdateOneWithoutExpensesNestedInput
    project?: ProjectUpdateOneWithoutExpensesNestedInput
  }

  export type ExpenseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    timesheetEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExpenseCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    amount: number
    date: Date | string
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    organizationId?: string | null
    budgetId?: string | null
    categoryId?: string | null
    timesheetEntryId?: string | null
    projectId?: string | null
  }

  export type ExpenseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    timesheetEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TimesheetCreateInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutTimesheetsInput
    organization?: OrganizationCreateNestedOneWithoutTimesheetsInput
    entries?: TimesheetEntryCreateNestedManyWithoutTimesheetInput
    project?: ProjectCreateNestedOneWithoutTimesheetsInput
  }

  export type TimesheetUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    organizationId?: string | null
    projectId?: string | null
    entries?: TimesheetEntryUncheckedCreateNestedManyWithoutTimesheetInput
  }

  export type TimesheetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutTimesheetsNestedInput
    organization?: OrganizationUpdateOneWithoutTimesheetsNestedInput
    entries?: TimesheetEntryUpdateManyWithoutTimesheetNestedInput
    project?: ProjectUpdateOneWithoutTimesheetsNestedInput
  }

  export type TimesheetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    entries?: TimesheetEntryUncheckedUpdateManyWithoutTimesheetNestedInput
  }

  export type TimesheetCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    organizationId?: string | null
    projectId?: string | null
  }

  export type TimesheetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimesheetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TimesheetEntryCreateInput = {
    id?: string
    description: string
    startTime: Date | string
    endTime: Date | string
    duration: number
    createdAt?: Date | string
    updatedAt?: Date | string
    timesheet: TimesheetCreateNestedOneWithoutEntriesInput
    expenses?: ExpenseCreateNestedManyWithoutTimesheetEntryInput
  }

  export type TimesheetEntryUncheckedCreateInput = {
    id?: string
    description: string
    startTime: Date | string
    endTime: Date | string
    duration: number
    createdAt?: Date | string
    updatedAt?: Date | string
    timesheetId: string
    expenses?: ExpenseUncheckedCreateNestedManyWithoutTimesheetEntryInput
  }

  export type TimesheetEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timesheet?: TimesheetUpdateOneRequiredWithoutEntriesNestedInput
    expenses?: ExpenseUpdateManyWithoutTimesheetEntryNestedInput
  }

  export type TimesheetEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timesheetId?: StringFieldUpdateOperationsInput | string
    expenses?: ExpenseUncheckedUpdateManyWithoutTimesheetEntryNestedInput
  }

  export type TimesheetEntryCreateManyInput = {
    id?: string
    description: string
    startTime: Date | string
    endTime: Date | string
    duration: number
    createdAt?: Date | string
    updatedAt?: Date | string
    timesheetId: string
  }

  export type TimesheetEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimesheetEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timesheetId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectCreateInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    budgets?: BudgetCreateNestedManyWithoutProjectInput
    expenses?: ExpenseCreateNestedManyWithoutProjectInput
    timesheets?: TimesheetCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    budgets?: BudgetUncheckedCreateNestedManyWithoutProjectInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutProjectInput
    timesheets?: TimesheetUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgets?: BudgetUpdateManyWithoutProjectNestedInput
    expenses?: ExpenseUpdateManyWithoutProjectNestedInput
    timesheets?: TimesheetUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgets?: BudgetUncheckedUpdateManyWithoutProjectNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutProjectNestedInput
    timesheets?: TimesheetUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateInput = {
    id?: string
    plan: string
    status?: string
    startDate?: Date | string
    endDate?: Date | string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutSubscriptionInput
  }

  export type SubscriptionUncheckedCreateInput = {
    id?: string
    plan: string
    status?: string
    startDate?: Date | string
    endDate?: Date | string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizationId: string
  }

  export type SubscriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutSubscriptionNestedInput
  }

  export type SubscriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type SubscriptionCreateManyInput = {
    id?: string
    plan: string
    status?: string
    startDate?: Date | string
    endDate?: Date | string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizationId: string
  }

  export type SubscriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type NotificationCreateInput = {
    id?: string
    title: string
    message: string
    isRead?: boolean
    type: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    title: string
    message: string
    isRead?: boolean
    type: string
    createdAt?: Date | string
    userId: string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    title: string
    message: string
    isRead?: boolean
    type: string
    createdAt?: Date | string
    userId: string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AuditLogCreateInput = {
    id?: string
    action: string
    entity: string
    entityId: string
    details?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    action: string
    entity: string
    entityId: string
    details?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    userId: string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    action: string
    entity: string
    entityId: string
    details?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    userId: string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type OrganizationNullableScalarRelationFilter = {
    is?: OrganizationWhereInput | null
    isNot?: OrganizationWhereInput | null
  }

  export type BudgetListRelationFilter = {
    every?: BudgetWhereInput
    some?: BudgetWhereInput
    none?: BudgetWhereInput
  }

  export type ExpenseListRelationFilter = {
    every?: ExpenseWhereInput
    some?: ExpenseWhereInput
    none?: ExpenseWhereInput
  }

  export type TimesheetListRelationFilter = {
    every?: TimesheetWhereInput
    some?: TimesheetWhereInput
    none?: TimesheetWhereInput
  }

  export type UserInvitationListRelationFilter = {
    every?: UserInvitationWhereInput
    some?: UserInvitationWhereInput
    none?: UserInvitationWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BudgetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExpenseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TimesheetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserInvitationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profileImage?: SortOrder
    phoneNumber?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
    organizationId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profileImage?: SortOrder
    phoneNumber?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
    organizationId?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profileImage?: SortOrder
    phoneNumber?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
    organizationId?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type SubscriptionNullableScalarRelationFilter = {
    is?: SubscriptionWhereInput | null
    isNot?: SubscriptionWhereInput | null
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrganizationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    description?: SortOrder
    logo?: SortOrder
    website?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    ownerId?: SortOrder
  }

  export type OrganizationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    description?: SortOrder
    logo?: SortOrder
    website?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    ownerId?: SortOrder
  }

  export type OrganizationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    description?: SortOrder
    logo?: SortOrder
    website?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    ownerId?: SortOrder
  }

  export type EnumInvitationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InvitationStatus | EnumInvitationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvitationStatusFilter<$PrismaModel> | $Enums.InvitationStatus
  }

  export type OrganizationScalarRelationFilter = {
    is?: OrganizationWhereInput
    isNot?: OrganizationWhereInput
  }

  export type UserInvitationCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    status?: SortOrder
    role?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    organizationId?: SortOrder
    userId?: SortOrder
  }

  export type UserInvitationMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    status?: SortOrder
    role?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    organizationId?: SortOrder
    userId?: SortOrder
  }

  export type UserInvitationMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    status?: SortOrder
    role?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    organizationId?: SortOrder
    userId?: SortOrder
  }

  export type EnumInvitationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InvitationStatus | EnumInvitationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvitationStatusWithAggregatesFilter<$PrismaModel> | $Enums.InvitationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInvitationStatusFilter<$PrismaModel>
    _max?: NestedEnumInvitationStatusFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BudgetCategoryListRelationFilter = {
    every?: BudgetCategoryWhereInput
    some?: BudgetCategoryWhereInput
    none?: BudgetCategoryWhereInput
  }

  export type ProjectNullableScalarRelationFilter = {
    is?: ProjectWhereInput | null
    isNot?: ProjectWhereInput | null
  }

  export type BudgetCategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BudgetCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
    projectId?: SortOrder
  }

  export type BudgetAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type BudgetMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
    projectId?: SortOrder
  }

  export type BudgetMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
    projectId?: SortOrder
  }

  export type BudgetSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BudgetScalarRelationFilter = {
    is?: BudgetWhereInput
    isNot?: BudgetWhereInput
  }

  export type BudgetCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    allocatedAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    budgetId?: SortOrder
  }

  export type BudgetCategoryAvgOrderByAggregateInput = {
    allocatedAmount?: SortOrder
  }

  export type BudgetCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    allocatedAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    budgetId?: SortOrder
  }

  export type BudgetCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    allocatedAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    budgetId?: SortOrder
  }

  export type BudgetCategorySumOrderByAggregateInput = {
    allocatedAmount?: SortOrder
  }

  export type BudgetNullableScalarRelationFilter = {
    is?: BudgetWhereInput | null
    isNot?: BudgetWhereInput | null
  }

  export type BudgetCategoryNullableScalarRelationFilter = {
    is?: BudgetCategoryWhereInput | null
    isNot?: BudgetCategoryWhereInput | null
  }

  export type TimesheetEntryNullableScalarRelationFilter = {
    is?: TimesheetEntryWhereInput | null
    isNot?: TimesheetEntryWhereInput | null
  }

  export type ExpenseCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    receiptUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
    budgetId?: SortOrder
    categoryId?: SortOrder
    timesheetEntryId?: SortOrder
    projectId?: SortOrder
  }

  export type ExpenseAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type ExpenseMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    receiptUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
    budgetId?: SortOrder
    categoryId?: SortOrder
    timesheetEntryId?: SortOrder
    projectId?: SortOrder
  }

  export type ExpenseMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    receiptUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
    budgetId?: SortOrder
    categoryId?: SortOrder
    timesheetEntryId?: SortOrder
    projectId?: SortOrder
  }

  export type ExpenseSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type TimesheetEntryListRelationFilter = {
    every?: TimesheetEntryWhereInput
    some?: TimesheetEntryWhereInput
    none?: TimesheetEntryWhereInput
  }

  export type TimesheetEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TimesheetCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
    projectId?: SortOrder
  }

  export type TimesheetMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
    projectId?: SortOrder
  }

  export type TimesheetMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
    projectId?: SortOrder
  }

  export type TimesheetScalarRelationFilter = {
    is?: TimesheetWhereInput
    isNot?: TimesheetWhereInput
  }

  export type TimesheetEntryCountOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    timesheetId?: SortOrder
  }

  export type TimesheetEntryAvgOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type TimesheetEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    timesheetId?: SortOrder
  }

  export type TimesheetEntryMinOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    timesheetId?: SortOrder
  }

  export type TimesheetEntrySumOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    trialEndsAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizationId?: SortOrder
  }

  export type SubscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    trialEndsAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizationId?: SortOrder
  }

  export type SubscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    trialEndsAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizationId?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type OrganizationCreateNestedOneWithoutMembersInput = {
    create?: XOR<OrganizationCreateWithoutMembersInput, OrganizationUncheckedCreateWithoutMembersInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutMembersInput
    connect?: OrganizationWhereUniqueInput
  }

  export type OrganizationCreateNestedOneWithoutOwnerInput = {
    create?: XOR<OrganizationCreateWithoutOwnerInput, OrganizationUncheckedCreateWithoutOwnerInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutOwnerInput
    connect?: OrganizationWhereUniqueInput
  }

  export type BudgetCreateNestedManyWithoutUserInput = {
    create?: XOR<BudgetCreateWithoutUserInput, BudgetUncheckedCreateWithoutUserInput> | BudgetCreateWithoutUserInput[] | BudgetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutUserInput | BudgetCreateOrConnectWithoutUserInput[]
    createMany?: BudgetCreateManyUserInputEnvelope
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
  }

  export type ExpenseCreateNestedManyWithoutUserInput = {
    create?: XOR<ExpenseCreateWithoutUserInput, ExpenseUncheckedCreateWithoutUserInput> | ExpenseCreateWithoutUserInput[] | ExpenseUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutUserInput | ExpenseCreateOrConnectWithoutUserInput[]
    createMany?: ExpenseCreateManyUserInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type TimesheetCreateNestedManyWithoutUserInput = {
    create?: XOR<TimesheetCreateWithoutUserInput, TimesheetUncheckedCreateWithoutUserInput> | TimesheetCreateWithoutUserInput[] | TimesheetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TimesheetCreateOrConnectWithoutUserInput | TimesheetCreateOrConnectWithoutUserInput[]
    createMany?: TimesheetCreateManyUserInputEnvelope
    connect?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
  }

  export type UserInvitationCreateNestedManyWithoutUserInput = {
    create?: XOR<UserInvitationCreateWithoutUserInput, UserInvitationUncheckedCreateWithoutUserInput> | UserInvitationCreateWithoutUserInput[] | UserInvitationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserInvitationCreateOrConnectWithoutUserInput | UserInvitationCreateOrConnectWithoutUserInput[]
    createMany?: UserInvitationCreateManyUserInputEnvelope
    connect?: UserInvitationWhereUniqueInput | UserInvitationWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type OrganizationUncheckedCreateNestedOneWithoutOwnerInput = {
    create?: XOR<OrganizationCreateWithoutOwnerInput, OrganizationUncheckedCreateWithoutOwnerInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutOwnerInput
    connect?: OrganizationWhereUniqueInput
  }

  export type BudgetUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BudgetCreateWithoutUserInput, BudgetUncheckedCreateWithoutUserInput> | BudgetCreateWithoutUserInput[] | BudgetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutUserInput | BudgetCreateOrConnectWithoutUserInput[]
    createMany?: BudgetCreateManyUserInputEnvelope
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
  }

  export type ExpenseUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ExpenseCreateWithoutUserInput, ExpenseUncheckedCreateWithoutUserInput> | ExpenseCreateWithoutUserInput[] | ExpenseUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutUserInput | ExpenseCreateOrConnectWithoutUserInput[]
    createMany?: ExpenseCreateManyUserInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type TimesheetUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TimesheetCreateWithoutUserInput, TimesheetUncheckedCreateWithoutUserInput> | TimesheetCreateWithoutUserInput[] | TimesheetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TimesheetCreateOrConnectWithoutUserInput | TimesheetCreateOrConnectWithoutUserInput[]
    createMany?: TimesheetCreateManyUserInputEnvelope
    connect?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
  }

  export type UserInvitationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserInvitationCreateWithoutUserInput, UserInvitationUncheckedCreateWithoutUserInput> | UserInvitationCreateWithoutUserInput[] | UserInvitationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserInvitationCreateOrConnectWithoutUserInput | UserInvitationCreateOrConnectWithoutUserInput[]
    createMany?: UserInvitationCreateManyUserInputEnvelope
    connect?: UserInvitationWhereUniqueInput | UserInvitationWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type OrganizationUpdateOneWithoutMembersNestedInput = {
    create?: XOR<OrganizationCreateWithoutMembersInput, OrganizationUncheckedCreateWithoutMembersInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutMembersInput
    upsert?: OrganizationUpsertWithoutMembersInput
    disconnect?: OrganizationWhereInput | boolean
    delete?: OrganizationWhereInput | boolean
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutMembersInput, OrganizationUpdateWithoutMembersInput>, OrganizationUncheckedUpdateWithoutMembersInput>
  }

  export type OrganizationUpdateOneWithoutOwnerNestedInput = {
    create?: XOR<OrganizationCreateWithoutOwnerInput, OrganizationUncheckedCreateWithoutOwnerInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutOwnerInput
    upsert?: OrganizationUpsertWithoutOwnerInput
    disconnect?: OrganizationWhereInput | boolean
    delete?: OrganizationWhereInput | boolean
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutOwnerInput, OrganizationUpdateWithoutOwnerInput>, OrganizationUncheckedUpdateWithoutOwnerInput>
  }

  export type BudgetUpdateManyWithoutUserNestedInput = {
    create?: XOR<BudgetCreateWithoutUserInput, BudgetUncheckedCreateWithoutUserInput> | BudgetCreateWithoutUserInput[] | BudgetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutUserInput | BudgetCreateOrConnectWithoutUserInput[]
    upsert?: BudgetUpsertWithWhereUniqueWithoutUserInput | BudgetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BudgetCreateManyUserInputEnvelope
    set?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    disconnect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    delete?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    update?: BudgetUpdateWithWhereUniqueWithoutUserInput | BudgetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BudgetUpdateManyWithWhereWithoutUserInput | BudgetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BudgetScalarWhereInput | BudgetScalarWhereInput[]
  }

  export type ExpenseUpdateManyWithoutUserNestedInput = {
    create?: XOR<ExpenseCreateWithoutUserInput, ExpenseUncheckedCreateWithoutUserInput> | ExpenseCreateWithoutUserInput[] | ExpenseUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutUserInput | ExpenseCreateOrConnectWithoutUserInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutUserInput | ExpenseUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ExpenseCreateManyUserInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutUserInput | ExpenseUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutUserInput | ExpenseUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type TimesheetUpdateManyWithoutUserNestedInput = {
    create?: XOR<TimesheetCreateWithoutUserInput, TimesheetUncheckedCreateWithoutUserInput> | TimesheetCreateWithoutUserInput[] | TimesheetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TimesheetCreateOrConnectWithoutUserInput | TimesheetCreateOrConnectWithoutUserInput[]
    upsert?: TimesheetUpsertWithWhereUniqueWithoutUserInput | TimesheetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TimesheetCreateManyUserInputEnvelope
    set?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
    disconnect?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
    delete?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
    connect?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
    update?: TimesheetUpdateWithWhereUniqueWithoutUserInput | TimesheetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TimesheetUpdateManyWithWhereWithoutUserInput | TimesheetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TimesheetScalarWhereInput | TimesheetScalarWhereInput[]
  }

  export type UserInvitationUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserInvitationCreateWithoutUserInput, UserInvitationUncheckedCreateWithoutUserInput> | UserInvitationCreateWithoutUserInput[] | UserInvitationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserInvitationCreateOrConnectWithoutUserInput | UserInvitationCreateOrConnectWithoutUserInput[]
    upsert?: UserInvitationUpsertWithWhereUniqueWithoutUserInput | UserInvitationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserInvitationCreateManyUserInputEnvelope
    set?: UserInvitationWhereUniqueInput | UserInvitationWhereUniqueInput[]
    disconnect?: UserInvitationWhereUniqueInput | UserInvitationWhereUniqueInput[]
    delete?: UserInvitationWhereUniqueInput | UserInvitationWhereUniqueInput[]
    connect?: UserInvitationWhereUniqueInput | UserInvitationWhereUniqueInput[]
    update?: UserInvitationUpdateWithWhereUniqueWithoutUserInput | UserInvitationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserInvitationUpdateManyWithWhereWithoutUserInput | UserInvitationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserInvitationScalarWhereInput | UserInvitationScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type OrganizationUncheckedUpdateOneWithoutOwnerNestedInput = {
    create?: XOR<OrganizationCreateWithoutOwnerInput, OrganizationUncheckedCreateWithoutOwnerInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutOwnerInput
    upsert?: OrganizationUpsertWithoutOwnerInput
    disconnect?: OrganizationWhereInput | boolean
    delete?: OrganizationWhereInput | boolean
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutOwnerInput, OrganizationUpdateWithoutOwnerInput>, OrganizationUncheckedUpdateWithoutOwnerInput>
  }

  export type BudgetUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BudgetCreateWithoutUserInput, BudgetUncheckedCreateWithoutUserInput> | BudgetCreateWithoutUserInput[] | BudgetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutUserInput | BudgetCreateOrConnectWithoutUserInput[]
    upsert?: BudgetUpsertWithWhereUniqueWithoutUserInput | BudgetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BudgetCreateManyUserInputEnvelope
    set?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    disconnect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    delete?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    update?: BudgetUpdateWithWhereUniqueWithoutUserInput | BudgetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BudgetUpdateManyWithWhereWithoutUserInput | BudgetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BudgetScalarWhereInput | BudgetScalarWhereInput[]
  }

  export type ExpenseUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ExpenseCreateWithoutUserInput, ExpenseUncheckedCreateWithoutUserInput> | ExpenseCreateWithoutUserInput[] | ExpenseUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutUserInput | ExpenseCreateOrConnectWithoutUserInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutUserInput | ExpenseUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ExpenseCreateManyUserInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutUserInput | ExpenseUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutUserInput | ExpenseUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type TimesheetUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TimesheetCreateWithoutUserInput, TimesheetUncheckedCreateWithoutUserInput> | TimesheetCreateWithoutUserInput[] | TimesheetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TimesheetCreateOrConnectWithoutUserInput | TimesheetCreateOrConnectWithoutUserInput[]
    upsert?: TimesheetUpsertWithWhereUniqueWithoutUserInput | TimesheetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TimesheetCreateManyUserInputEnvelope
    set?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
    disconnect?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
    delete?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
    connect?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
    update?: TimesheetUpdateWithWhereUniqueWithoutUserInput | TimesheetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TimesheetUpdateManyWithWhereWithoutUserInput | TimesheetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TimesheetScalarWhereInput | TimesheetScalarWhereInput[]
  }

  export type UserInvitationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserInvitationCreateWithoutUserInput, UserInvitationUncheckedCreateWithoutUserInput> | UserInvitationCreateWithoutUserInput[] | UserInvitationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserInvitationCreateOrConnectWithoutUserInput | UserInvitationCreateOrConnectWithoutUserInput[]
    upsert?: UserInvitationUpsertWithWhereUniqueWithoutUserInput | UserInvitationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserInvitationCreateManyUserInputEnvelope
    set?: UserInvitationWhereUniqueInput | UserInvitationWhereUniqueInput[]
    disconnect?: UserInvitationWhereUniqueInput | UserInvitationWhereUniqueInput[]
    delete?: UserInvitationWhereUniqueInput | UserInvitationWhereUniqueInput[]
    connect?: UserInvitationWhereUniqueInput | UserInvitationWhereUniqueInput[]
    update?: UserInvitationUpdateWithWhereUniqueWithoutUserInput | UserInvitationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserInvitationUpdateManyWithWhereWithoutUserInput | UserInvitationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserInvitationScalarWhereInput | UserInvitationScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutOwnedOrganizationInput = {
    create?: XOR<UserCreateWithoutOwnedOrganizationInput, UserUncheckedCreateWithoutOwnedOrganizationInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedOrganizationInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput> | UserCreateWithoutOrganizationInput[] | UserUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInput | UserCreateOrConnectWithoutOrganizationInput[]
    createMany?: UserCreateManyOrganizationInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserInvitationCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<UserInvitationCreateWithoutOrganizationInput, UserInvitationUncheckedCreateWithoutOrganizationInput> | UserInvitationCreateWithoutOrganizationInput[] | UserInvitationUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserInvitationCreateOrConnectWithoutOrganizationInput | UserInvitationCreateOrConnectWithoutOrganizationInput[]
    createMany?: UserInvitationCreateManyOrganizationInputEnvelope
    connect?: UserInvitationWhereUniqueInput | UserInvitationWhereUniqueInput[]
  }

  export type BudgetCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<BudgetCreateWithoutOrganizationInput, BudgetUncheckedCreateWithoutOrganizationInput> | BudgetCreateWithoutOrganizationInput[] | BudgetUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutOrganizationInput | BudgetCreateOrConnectWithoutOrganizationInput[]
    createMany?: BudgetCreateManyOrganizationInputEnvelope
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
  }

  export type ExpenseCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<ExpenseCreateWithoutOrganizationInput, ExpenseUncheckedCreateWithoutOrganizationInput> | ExpenseCreateWithoutOrganizationInput[] | ExpenseUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutOrganizationInput | ExpenseCreateOrConnectWithoutOrganizationInput[]
    createMany?: ExpenseCreateManyOrganizationInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type TimesheetCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<TimesheetCreateWithoutOrganizationInput, TimesheetUncheckedCreateWithoutOrganizationInput> | TimesheetCreateWithoutOrganizationInput[] | TimesheetUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: TimesheetCreateOrConnectWithoutOrganizationInput | TimesheetCreateOrConnectWithoutOrganizationInput[]
    createMany?: TimesheetCreateManyOrganizationInputEnvelope
    connect?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
  }

  export type SubscriptionCreateNestedOneWithoutOrganizationInput = {
    create?: XOR<SubscriptionCreateWithoutOrganizationInput, SubscriptionUncheckedCreateWithoutOrganizationInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutOrganizationInput
    connect?: SubscriptionWhereUniqueInput
  }

  export type UserUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput> | UserCreateWithoutOrganizationInput[] | UserUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInput | UserCreateOrConnectWithoutOrganizationInput[]
    createMany?: UserCreateManyOrganizationInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserInvitationUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<UserInvitationCreateWithoutOrganizationInput, UserInvitationUncheckedCreateWithoutOrganizationInput> | UserInvitationCreateWithoutOrganizationInput[] | UserInvitationUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserInvitationCreateOrConnectWithoutOrganizationInput | UserInvitationCreateOrConnectWithoutOrganizationInput[]
    createMany?: UserInvitationCreateManyOrganizationInputEnvelope
    connect?: UserInvitationWhereUniqueInput | UserInvitationWhereUniqueInput[]
  }

  export type BudgetUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<BudgetCreateWithoutOrganizationInput, BudgetUncheckedCreateWithoutOrganizationInput> | BudgetCreateWithoutOrganizationInput[] | BudgetUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutOrganizationInput | BudgetCreateOrConnectWithoutOrganizationInput[]
    createMany?: BudgetCreateManyOrganizationInputEnvelope
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
  }

  export type ExpenseUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<ExpenseCreateWithoutOrganizationInput, ExpenseUncheckedCreateWithoutOrganizationInput> | ExpenseCreateWithoutOrganizationInput[] | ExpenseUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutOrganizationInput | ExpenseCreateOrConnectWithoutOrganizationInput[]
    createMany?: ExpenseCreateManyOrganizationInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type TimesheetUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<TimesheetCreateWithoutOrganizationInput, TimesheetUncheckedCreateWithoutOrganizationInput> | TimesheetCreateWithoutOrganizationInput[] | TimesheetUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: TimesheetCreateOrConnectWithoutOrganizationInput | TimesheetCreateOrConnectWithoutOrganizationInput[]
    createMany?: TimesheetCreateManyOrganizationInputEnvelope
    connect?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
  }

  export type SubscriptionUncheckedCreateNestedOneWithoutOrganizationInput = {
    create?: XOR<SubscriptionCreateWithoutOrganizationInput, SubscriptionUncheckedCreateWithoutOrganizationInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutOrganizationInput
    connect?: SubscriptionWhereUniqueInput
  }

  export type UserUpdateOneWithoutOwnedOrganizationNestedInput = {
    create?: XOR<UserCreateWithoutOwnedOrganizationInput, UserUncheckedCreateWithoutOwnedOrganizationInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedOrganizationInput
    upsert?: UserUpsertWithoutOwnedOrganizationInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOwnedOrganizationInput, UserUpdateWithoutOwnedOrganizationInput>, UserUncheckedUpdateWithoutOwnedOrganizationInput>
  }

  export type UserUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput> | UserCreateWithoutOrganizationInput[] | UserUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInput | UserCreateOrConnectWithoutOrganizationInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutOrganizationInput | UserUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: UserCreateManyOrganizationInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutOrganizationInput | UserUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: UserUpdateManyWithWhereWithoutOrganizationInput | UserUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserInvitationUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<UserInvitationCreateWithoutOrganizationInput, UserInvitationUncheckedCreateWithoutOrganizationInput> | UserInvitationCreateWithoutOrganizationInput[] | UserInvitationUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserInvitationCreateOrConnectWithoutOrganizationInput | UserInvitationCreateOrConnectWithoutOrganizationInput[]
    upsert?: UserInvitationUpsertWithWhereUniqueWithoutOrganizationInput | UserInvitationUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: UserInvitationCreateManyOrganizationInputEnvelope
    set?: UserInvitationWhereUniqueInput | UserInvitationWhereUniqueInput[]
    disconnect?: UserInvitationWhereUniqueInput | UserInvitationWhereUniqueInput[]
    delete?: UserInvitationWhereUniqueInput | UserInvitationWhereUniqueInput[]
    connect?: UserInvitationWhereUniqueInput | UserInvitationWhereUniqueInput[]
    update?: UserInvitationUpdateWithWhereUniqueWithoutOrganizationInput | UserInvitationUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: UserInvitationUpdateManyWithWhereWithoutOrganizationInput | UserInvitationUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: UserInvitationScalarWhereInput | UserInvitationScalarWhereInput[]
  }

  export type BudgetUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<BudgetCreateWithoutOrganizationInput, BudgetUncheckedCreateWithoutOrganizationInput> | BudgetCreateWithoutOrganizationInput[] | BudgetUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutOrganizationInput | BudgetCreateOrConnectWithoutOrganizationInput[]
    upsert?: BudgetUpsertWithWhereUniqueWithoutOrganizationInput | BudgetUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: BudgetCreateManyOrganizationInputEnvelope
    set?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    disconnect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    delete?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    update?: BudgetUpdateWithWhereUniqueWithoutOrganizationInput | BudgetUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: BudgetUpdateManyWithWhereWithoutOrganizationInput | BudgetUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: BudgetScalarWhereInput | BudgetScalarWhereInput[]
  }

  export type ExpenseUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<ExpenseCreateWithoutOrganizationInput, ExpenseUncheckedCreateWithoutOrganizationInput> | ExpenseCreateWithoutOrganizationInput[] | ExpenseUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutOrganizationInput | ExpenseCreateOrConnectWithoutOrganizationInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutOrganizationInput | ExpenseUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: ExpenseCreateManyOrganizationInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutOrganizationInput | ExpenseUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutOrganizationInput | ExpenseUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type TimesheetUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<TimesheetCreateWithoutOrganizationInput, TimesheetUncheckedCreateWithoutOrganizationInput> | TimesheetCreateWithoutOrganizationInput[] | TimesheetUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: TimesheetCreateOrConnectWithoutOrganizationInput | TimesheetCreateOrConnectWithoutOrganizationInput[]
    upsert?: TimesheetUpsertWithWhereUniqueWithoutOrganizationInput | TimesheetUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: TimesheetCreateManyOrganizationInputEnvelope
    set?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
    disconnect?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
    delete?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
    connect?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
    update?: TimesheetUpdateWithWhereUniqueWithoutOrganizationInput | TimesheetUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: TimesheetUpdateManyWithWhereWithoutOrganizationInput | TimesheetUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: TimesheetScalarWhereInput | TimesheetScalarWhereInput[]
  }

  export type SubscriptionUpdateOneWithoutOrganizationNestedInput = {
    create?: XOR<SubscriptionCreateWithoutOrganizationInput, SubscriptionUncheckedCreateWithoutOrganizationInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutOrganizationInput
    upsert?: SubscriptionUpsertWithoutOrganizationInput
    disconnect?: SubscriptionWhereInput | boolean
    delete?: SubscriptionWhereInput | boolean
    connect?: SubscriptionWhereUniqueInput
    update?: XOR<XOR<SubscriptionUpdateToOneWithWhereWithoutOrganizationInput, SubscriptionUpdateWithoutOrganizationInput>, SubscriptionUncheckedUpdateWithoutOrganizationInput>
  }

  export type UserUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput> | UserCreateWithoutOrganizationInput[] | UserUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInput | UserCreateOrConnectWithoutOrganizationInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutOrganizationInput | UserUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: UserCreateManyOrganizationInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutOrganizationInput | UserUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: UserUpdateManyWithWhereWithoutOrganizationInput | UserUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserInvitationUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<UserInvitationCreateWithoutOrganizationInput, UserInvitationUncheckedCreateWithoutOrganizationInput> | UserInvitationCreateWithoutOrganizationInput[] | UserInvitationUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserInvitationCreateOrConnectWithoutOrganizationInput | UserInvitationCreateOrConnectWithoutOrganizationInput[]
    upsert?: UserInvitationUpsertWithWhereUniqueWithoutOrganizationInput | UserInvitationUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: UserInvitationCreateManyOrganizationInputEnvelope
    set?: UserInvitationWhereUniqueInput | UserInvitationWhereUniqueInput[]
    disconnect?: UserInvitationWhereUniqueInput | UserInvitationWhereUniqueInput[]
    delete?: UserInvitationWhereUniqueInput | UserInvitationWhereUniqueInput[]
    connect?: UserInvitationWhereUniqueInput | UserInvitationWhereUniqueInput[]
    update?: UserInvitationUpdateWithWhereUniqueWithoutOrganizationInput | UserInvitationUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: UserInvitationUpdateManyWithWhereWithoutOrganizationInput | UserInvitationUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: UserInvitationScalarWhereInput | UserInvitationScalarWhereInput[]
  }

  export type BudgetUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<BudgetCreateWithoutOrganizationInput, BudgetUncheckedCreateWithoutOrganizationInput> | BudgetCreateWithoutOrganizationInput[] | BudgetUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutOrganizationInput | BudgetCreateOrConnectWithoutOrganizationInput[]
    upsert?: BudgetUpsertWithWhereUniqueWithoutOrganizationInput | BudgetUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: BudgetCreateManyOrganizationInputEnvelope
    set?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    disconnect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    delete?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    update?: BudgetUpdateWithWhereUniqueWithoutOrganizationInput | BudgetUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: BudgetUpdateManyWithWhereWithoutOrganizationInput | BudgetUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: BudgetScalarWhereInput | BudgetScalarWhereInput[]
  }

  export type ExpenseUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<ExpenseCreateWithoutOrganizationInput, ExpenseUncheckedCreateWithoutOrganizationInput> | ExpenseCreateWithoutOrganizationInput[] | ExpenseUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutOrganizationInput | ExpenseCreateOrConnectWithoutOrganizationInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutOrganizationInput | ExpenseUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: ExpenseCreateManyOrganizationInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutOrganizationInput | ExpenseUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutOrganizationInput | ExpenseUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type TimesheetUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<TimesheetCreateWithoutOrganizationInput, TimesheetUncheckedCreateWithoutOrganizationInput> | TimesheetCreateWithoutOrganizationInput[] | TimesheetUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: TimesheetCreateOrConnectWithoutOrganizationInput | TimesheetCreateOrConnectWithoutOrganizationInput[]
    upsert?: TimesheetUpsertWithWhereUniqueWithoutOrganizationInput | TimesheetUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: TimesheetCreateManyOrganizationInputEnvelope
    set?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
    disconnect?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
    delete?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
    connect?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
    update?: TimesheetUpdateWithWhereUniqueWithoutOrganizationInput | TimesheetUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: TimesheetUpdateManyWithWhereWithoutOrganizationInput | TimesheetUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: TimesheetScalarWhereInput | TimesheetScalarWhereInput[]
  }

  export type SubscriptionUncheckedUpdateOneWithoutOrganizationNestedInput = {
    create?: XOR<SubscriptionCreateWithoutOrganizationInput, SubscriptionUncheckedCreateWithoutOrganizationInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutOrganizationInput
    upsert?: SubscriptionUpsertWithoutOrganizationInput
    disconnect?: SubscriptionWhereInput | boolean
    delete?: SubscriptionWhereInput | boolean
    connect?: SubscriptionWhereUniqueInput
    update?: XOR<XOR<SubscriptionUpdateToOneWithWhereWithoutOrganizationInput, SubscriptionUpdateWithoutOrganizationInput>, SubscriptionUncheckedUpdateWithoutOrganizationInput>
  }

  export type OrganizationCreateNestedOneWithoutInvitationsInput = {
    create?: XOR<OrganizationCreateWithoutInvitationsInput, OrganizationUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutInvitationsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutInvitationsInput = {
    create?: XOR<UserCreateWithoutInvitationsInput, UserUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInvitationsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumInvitationStatusFieldUpdateOperationsInput = {
    set?: $Enums.InvitationStatus
  }

  export type OrganizationUpdateOneRequiredWithoutInvitationsNestedInput = {
    create?: XOR<OrganizationCreateWithoutInvitationsInput, OrganizationUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutInvitationsInput
    upsert?: OrganizationUpsertWithoutInvitationsInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutInvitationsInput, OrganizationUpdateWithoutInvitationsInput>, OrganizationUncheckedUpdateWithoutInvitationsInput>
  }

  export type UserUpdateOneWithoutInvitationsNestedInput = {
    create?: XOR<UserCreateWithoutInvitationsInput, UserUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInvitationsInput
    upsert?: UserUpsertWithoutInvitationsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInvitationsInput, UserUpdateWithoutInvitationsInput>, UserUncheckedUpdateWithoutInvitationsInput>
  }

  export type UserCreateNestedOneWithoutBudgetsInput = {
    create?: XOR<UserCreateWithoutBudgetsInput, UserUncheckedCreateWithoutBudgetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBudgetsInput
    connect?: UserWhereUniqueInput
  }

  export type OrganizationCreateNestedOneWithoutBudgetsInput = {
    create?: XOR<OrganizationCreateWithoutBudgetsInput, OrganizationUncheckedCreateWithoutBudgetsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutBudgetsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type BudgetCategoryCreateNestedManyWithoutBudgetInput = {
    create?: XOR<BudgetCategoryCreateWithoutBudgetInput, BudgetCategoryUncheckedCreateWithoutBudgetInput> | BudgetCategoryCreateWithoutBudgetInput[] | BudgetCategoryUncheckedCreateWithoutBudgetInput[]
    connectOrCreate?: BudgetCategoryCreateOrConnectWithoutBudgetInput | BudgetCategoryCreateOrConnectWithoutBudgetInput[]
    createMany?: BudgetCategoryCreateManyBudgetInputEnvelope
    connect?: BudgetCategoryWhereUniqueInput | BudgetCategoryWhereUniqueInput[]
  }

  export type ExpenseCreateNestedManyWithoutBudgetInput = {
    create?: XOR<ExpenseCreateWithoutBudgetInput, ExpenseUncheckedCreateWithoutBudgetInput> | ExpenseCreateWithoutBudgetInput[] | ExpenseUncheckedCreateWithoutBudgetInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutBudgetInput | ExpenseCreateOrConnectWithoutBudgetInput[]
    createMany?: ExpenseCreateManyBudgetInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type ProjectCreateNestedOneWithoutBudgetsInput = {
    create?: XOR<ProjectCreateWithoutBudgetsInput, ProjectUncheckedCreateWithoutBudgetsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutBudgetsInput
    connect?: ProjectWhereUniqueInput
  }

  export type BudgetCategoryUncheckedCreateNestedManyWithoutBudgetInput = {
    create?: XOR<BudgetCategoryCreateWithoutBudgetInput, BudgetCategoryUncheckedCreateWithoutBudgetInput> | BudgetCategoryCreateWithoutBudgetInput[] | BudgetCategoryUncheckedCreateWithoutBudgetInput[]
    connectOrCreate?: BudgetCategoryCreateOrConnectWithoutBudgetInput | BudgetCategoryCreateOrConnectWithoutBudgetInput[]
    createMany?: BudgetCategoryCreateManyBudgetInputEnvelope
    connect?: BudgetCategoryWhereUniqueInput | BudgetCategoryWhereUniqueInput[]
  }

  export type ExpenseUncheckedCreateNestedManyWithoutBudgetInput = {
    create?: XOR<ExpenseCreateWithoutBudgetInput, ExpenseUncheckedCreateWithoutBudgetInput> | ExpenseCreateWithoutBudgetInput[] | ExpenseUncheckedCreateWithoutBudgetInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutBudgetInput | ExpenseCreateOrConnectWithoutBudgetInput[]
    createMany?: ExpenseCreateManyBudgetInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneWithoutBudgetsNestedInput = {
    create?: XOR<UserCreateWithoutBudgetsInput, UserUncheckedCreateWithoutBudgetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBudgetsInput
    upsert?: UserUpsertWithoutBudgetsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBudgetsInput, UserUpdateWithoutBudgetsInput>, UserUncheckedUpdateWithoutBudgetsInput>
  }

  export type OrganizationUpdateOneWithoutBudgetsNestedInput = {
    create?: XOR<OrganizationCreateWithoutBudgetsInput, OrganizationUncheckedCreateWithoutBudgetsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutBudgetsInput
    upsert?: OrganizationUpsertWithoutBudgetsInput
    disconnect?: OrganizationWhereInput | boolean
    delete?: OrganizationWhereInput | boolean
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutBudgetsInput, OrganizationUpdateWithoutBudgetsInput>, OrganizationUncheckedUpdateWithoutBudgetsInput>
  }

  export type BudgetCategoryUpdateManyWithoutBudgetNestedInput = {
    create?: XOR<BudgetCategoryCreateWithoutBudgetInput, BudgetCategoryUncheckedCreateWithoutBudgetInput> | BudgetCategoryCreateWithoutBudgetInput[] | BudgetCategoryUncheckedCreateWithoutBudgetInput[]
    connectOrCreate?: BudgetCategoryCreateOrConnectWithoutBudgetInput | BudgetCategoryCreateOrConnectWithoutBudgetInput[]
    upsert?: BudgetCategoryUpsertWithWhereUniqueWithoutBudgetInput | BudgetCategoryUpsertWithWhereUniqueWithoutBudgetInput[]
    createMany?: BudgetCategoryCreateManyBudgetInputEnvelope
    set?: BudgetCategoryWhereUniqueInput | BudgetCategoryWhereUniqueInput[]
    disconnect?: BudgetCategoryWhereUniqueInput | BudgetCategoryWhereUniqueInput[]
    delete?: BudgetCategoryWhereUniqueInput | BudgetCategoryWhereUniqueInput[]
    connect?: BudgetCategoryWhereUniqueInput | BudgetCategoryWhereUniqueInput[]
    update?: BudgetCategoryUpdateWithWhereUniqueWithoutBudgetInput | BudgetCategoryUpdateWithWhereUniqueWithoutBudgetInput[]
    updateMany?: BudgetCategoryUpdateManyWithWhereWithoutBudgetInput | BudgetCategoryUpdateManyWithWhereWithoutBudgetInput[]
    deleteMany?: BudgetCategoryScalarWhereInput | BudgetCategoryScalarWhereInput[]
  }

  export type ExpenseUpdateManyWithoutBudgetNestedInput = {
    create?: XOR<ExpenseCreateWithoutBudgetInput, ExpenseUncheckedCreateWithoutBudgetInput> | ExpenseCreateWithoutBudgetInput[] | ExpenseUncheckedCreateWithoutBudgetInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutBudgetInput | ExpenseCreateOrConnectWithoutBudgetInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutBudgetInput | ExpenseUpsertWithWhereUniqueWithoutBudgetInput[]
    createMany?: ExpenseCreateManyBudgetInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutBudgetInput | ExpenseUpdateWithWhereUniqueWithoutBudgetInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutBudgetInput | ExpenseUpdateManyWithWhereWithoutBudgetInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type ProjectUpdateOneWithoutBudgetsNestedInput = {
    create?: XOR<ProjectCreateWithoutBudgetsInput, ProjectUncheckedCreateWithoutBudgetsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutBudgetsInput
    upsert?: ProjectUpsertWithoutBudgetsInput
    disconnect?: ProjectWhereInput | boolean
    delete?: ProjectWhereInput | boolean
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutBudgetsInput, ProjectUpdateWithoutBudgetsInput>, ProjectUncheckedUpdateWithoutBudgetsInput>
  }

  export type BudgetCategoryUncheckedUpdateManyWithoutBudgetNestedInput = {
    create?: XOR<BudgetCategoryCreateWithoutBudgetInput, BudgetCategoryUncheckedCreateWithoutBudgetInput> | BudgetCategoryCreateWithoutBudgetInput[] | BudgetCategoryUncheckedCreateWithoutBudgetInput[]
    connectOrCreate?: BudgetCategoryCreateOrConnectWithoutBudgetInput | BudgetCategoryCreateOrConnectWithoutBudgetInput[]
    upsert?: BudgetCategoryUpsertWithWhereUniqueWithoutBudgetInput | BudgetCategoryUpsertWithWhereUniqueWithoutBudgetInput[]
    createMany?: BudgetCategoryCreateManyBudgetInputEnvelope
    set?: BudgetCategoryWhereUniqueInput | BudgetCategoryWhereUniqueInput[]
    disconnect?: BudgetCategoryWhereUniqueInput | BudgetCategoryWhereUniqueInput[]
    delete?: BudgetCategoryWhereUniqueInput | BudgetCategoryWhereUniqueInput[]
    connect?: BudgetCategoryWhereUniqueInput | BudgetCategoryWhereUniqueInput[]
    update?: BudgetCategoryUpdateWithWhereUniqueWithoutBudgetInput | BudgetCategoryUpdateWithWhereUniqueWithoutBudgetInput[]
    updateMany?: BudgetCategoryUpdateManyWithWhereWithoutBudgetInput | BudgetCategoryUpdateManyWithWhereWithoutBudgetInput[]
    deleteMany?: BudgetCategoryScalarWhereInput | BudgetCategoryScalarWhereInput[]
  }

  export type ExpenseUncheckedUpdateManyWithoutBudgetNestedInput = {
    create?: XOR<ExpenseCreateWithoutBudgetInput, ExpenseUncheckedCreateWithoutBudgetInput> | ExpenseCreateWithoutBudgetInput[] | ExpenseUncheckedCreateWithoutBudgetInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutBudgetInput | ExpenseCreateOrConnectWithoutBudgetInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutBudgetInput | ExpenseUpsertWithWhereUniqueWithoutBudgetInput[]
    createMany?: ExpenseCreateManyBudgetInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutBudgetInput | ExpenseUpdateWithWhereUniqueWithoutBudgetInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutBudgetInput | ExpenseUpdateManyWithWhereWithoutBudgetInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type BudgetCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<BudgetCreateWithoutCategoriesInput, BudgetUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: BudgetCreateOrConnectWithoutCategoriesInput
    connect?: BudgetWhereUniqueInput
  }

  export type ExpenseCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ExpenseCreateWithoutCategoryInput, ExpenseUncheckedCreateWithoutCategoryInput> | ExpenseCreateWithoutCategoryInput[] | ExpenseUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutCategoryInput | ExpenseCreateOrConnectWithoutCategoryInput[]
    createMany?: ExpenseCreateManyCategoryInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type ExpenseUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ExpenseCreateWithoutCategoryInput, ExpenseUncheckedCreateWithoutCategoryInput> | ExpenseCreateWithoutCategoryInput[] | ExpenseUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutCategoryInput | ExpenseCreateOrConnectWithoutCategoryInput[]
    createMany?: ExpenseCreateManyCategoryInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type BudgetUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: XOR<BudgetCreateWithoutCategoriesInput, BudgetUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: BudgetCreateOrConnectWithoutCategoriesInput
    upsert?: BudgetUpsertWithoutCategoriesInput
    connect?: BudgetWhereUniqueInput
    update?: XOR<XOR<BudgetUpdateToOneWithWhereWithoutCategoriesInput, BudgetUpdateWithoutCategoriesInput>, BudgetUncheckedUpdateWithoutCategoriesInput>
  }

  export type ExpenseUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ExpenseCreateWithoutCategoryInput, ExpenseUncheckedCreateWithoutCategoryInput> | ExpenseCreateWithoutCategoryInput[] | ExpenseUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutCategoryInput | ExpenseCreateOrConnectWithoutCategoryInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutCategoryInput | ExpenseUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ExpenseCreateManyCategoryInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutCategoryInput | ExpenseUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutCategoryInput | ExpenseUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type ExpenseUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ExpenseCreateWithoutCategoryInput, ExpenseUncheckedCreateWithoutCategoryInput> | ExpenseCreateWithoutCategoryInput[] | ExpenseUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutCategoryInput | ExpenseCreateOrConnectWithoutCategoryInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutCategoryInput | ExpenseUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ExpenseCreateManyCategoryInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutCategoryInput | ExpenseUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutCategoryInput | ExpenseUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutExpensesInput = {
    create?: XOR<UserCreateWithoutExpensesInput, UserUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: UserCreateOrConnectWithoutExpensesInput
    connect?: UserWhereUniqueInput
  }

  export type OrganizationCreateNestedOneWithoutExpensesInput = {
    create?: XOR<OrganizationCreateWithoutExpensesInput, OrganizationUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutExpensesInput
    connect?: OrganizationWhereUniqueInput
  }

  export type BudgetCreateNestedOneWithoutExpensesInput = {
    create?: XOR<BudgetCreateWithoutExpensesInput, BudgetUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: BudgetCreateOrConnectWithoutExpensesInput
    connect?: BudgetWhereUniqueInput
  }

  export type BudgetCategoryCreateNestedOneWithoutExpensesInput = {
    create?: XOR<BudgetCategoryCreateWithoutExpensesInput, BudgetCategoryUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: BudgetCategoryCreateOrConnectWithoutExpensesInput
    connect?: BudgetCategoryWhereUniqueInput
  }

  export type TimesheetEntryCreateNestedOneWithoutExpensesInput = {
    create?: XOR<TimesheetEntryCreateWithoutExpensesInput, TimesheetEntryUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: TimesheetEntryCreateOrConnectWithoutExpensesInput
    connect?: TimesheetEntryWhereUniqueInput
  }

  export type ProjectCreateNestedOneWithoutExpensesInput = {
    create?: XOR<ProjectCreateWithoutExpensesInput, ProjectUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutExpensesInput
    connect?: ProjectWhereUniqueInput
  }

  export type UserUpdateOneWithoutExpensesNestedInput = {
    create?: XOR<UserCreateWithoutExpensesInput, UserUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: UserCreateOrConnectWithoutExpensesInput
    upsert?: UserUpsertWithoutExpensesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutExpensesInput, UserUpdateWithoutExpensesInput>, UserUncheckedUpdateWithoutExpensesInput>
  }

  export type OrganizationUpdateOneWithoutExpensesNestedInput = {
    create?: XOR<OrganizationCreateWithoutExpensesInput, OrganizationUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutExpensesInput
    upsert?: OrganizationUpsertWithoutExpensesInput
    disconnect?: OrganizationWhereInput | boolean
    delete?: OrganizationWhereInput | boolean
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutExpensesInput, OrganizationUpdateWithoutExpensesInput>, OrganizationUncheckedUpdateWithoutExpensesInput>
  }

  export type BudgetUpdateOneWithoutExpensesNestedInput = {
    create?: XOR<BudgetCreateWithoutExpensesInput, BudgetUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: BudgetCreateOrConnectWithoutExpensesInput
    upsert?: BudgetUpsertWithoutExpensesInput
    disconnect?: BudgetWhereInput | boolean
    delete?: BudgetWhereInput | boolean
    connect?: BudgetWhereUniqueInput
    update?: XOR<XOR<BudgetUpdateToOneWithWhereWithoutExpensesInput, BudgetUpdateWithoutExpensesInput>, BudgetUncheckedUpdateWithoutExpensesInput>
  }

  export type BudgetCategoryUpdateOneWithoutExpensesNestedInput = {
    create?: XOR<BudgetCategoryCreateWithoutExpensesInput, BudgetCategoryUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: BudgetCategoryCreateOrConnectWithoutExpensesInput
    upsert?: BudgetCategoryUpsertWithoutExpensesInput
    disconnect?: BudgetCategoryWhereInput | boolean
    delete?: BudgetCategoryWhereInput | boolean
    connect?: BudgetCategoryWhereUniqueInput
    update?: XOR<XOR<BudgetCategoryUpdateToOneWithWhereWithoutExpensesInput, BudgetCategoryUpdateWithoutExpensesInput>, BudgetCategoryUncheckedUpdateWithoutExpensesInput>
  }

  export type TimesheetEntryUpdateOneWithoutExpensesNestedInput = {
    create?: XOR<TimesheetEntryCreateWithoutExpensesInput, TimesheetEntryUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: TimesheetEntryCreateOrConnectWithoutExpensesInput
    upsert?: TimesheetEntryUpsertWithoutExpensesInput
    disconnect?: TimesheetEntryWhereInput | boolean
    delete?: TimesheetEntryWhereInput | boolean
    connect?: TimesheetEntryWhereUniqueInput
    update?: XOR<XOR<TimesheetEntryUpdateToOneWithWhereWithoutExpensesInput, TimesheetEntryUpdateWithoutExpensesInput>, TimesheetEntryUncheckedUpdateWithoutExpensesInput>
  }

  export type ProjectUpdateOneWithoutExpensesNestedInput = {
    create?: XOR<ProjectCreateWithoutExpensesInput, ProjectUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutExpensesInput
    upsert?: ProjectUpsertWithoutExpensesInput
    disconnect?: ProjectWhereInput | boolean
    delete?: ProjectWhereInput | boolean
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutExpensesInput, ProjectUpdateWithoutExpensesInput>, ProjectUncheckedUpdateWithoutExpensesInput>
  }

  export type UserCreateNestedOneWithoutTimesheetsInput = {
    create?: XOR<UserCreateWithoutTimesheetsInput, UserUncheckedCreateWithoutTimesheetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTimesheetsInput
    connect?: UserWhereUniqueInput
  }

  export type OrganizationCreateNestedOneWithoutTimesheetsInput = {
    create?: XOR<OrganizationCreateWithoutTimesheetsInput, OrganizationUncheckedCreateWithoutTimesheetsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutTimesheetsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type TimesheetEntryCreateNestedManyWithoutTimesheetInput = {
    create?: XOR<TimesheetEntryCreateWithoutTimesheetInput, TimesheetEntryUncheckedCreateWithoutTimesheetInput> | TimesheetEntryCreateWithoutTimesheetInput[] | TimesheetEntryUncheckedCreateWithoutTimesheetInput[]
    connectOrCreate?: TimesheetEntryCreateOrConnectWithoutTimesheetInput | TimesheetEntryCreateOrConnectWithoutTimesheetInput[]
    createMany?: TimesheetEntryCreateManyTimesheetInputEnvelope
    connect?: TimesheetEntryWhereUniqueInput | TimesheetEntryWhereUniqueInput[]
  }

  export type ProjectCreateNestedOneWithoutTimesheetsInput = {
    create?: XOR<ProjectCreateWithoutTimesheetsInput, ProjectUncheckedCreateWithoutTimesheetsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutTimesheetsInput
    connect?: ProjectWhereUniqueInput
  }

  export type TimesheetEntryUncheckedCreateNestedManyWithoutTimesheetInput = {
    create?: XOR<TimesheetEntryCreateWithoutTimesheetInput, TimesheetEntryUncheckedCreateWithoutTimesheetInput> | TimesheetEntryCreateWithoutTimesheetInput[] | TimesheetEntryUncheckedCreateWithoutTimesheetInput[]
    connectOrCreate?: TimesheetEntryCreateOrConnectWithoutTimesheetInput | TimesheetEntryCreateOrConnectWithoutTimesheetInput[]
    createMany?: TimesheetEntryCreateManyTimesheetInputEnvelope
    connect?: TimesheetEntryWhereUniqueInput | TimesheetEntryWhereUniqueInput[]
  }

  export type UserUpdateOneWithoutTimesheetsNestedInput = {
    create?: XOR<UserCreateWithoutTimesheetsInput, UserUncheckedCreateWithoutTimesheetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTimesheetsInput
    upsert?: UserUpsertWithoutTimesheetsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTimesheetsInput, UserUpdateWithoutTimesheetsInput>, UserUncheckedUpdateWithoutTimesheetsInput>
  }

  export type OrganizationUpdateOneWithoutTimesheetsNestedInput = {
    create?: XOR<OrganizationCreateWithoutTimesheetsInput, OrganizationUncheckedCreateWithoutTimesheetsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutTimesheetsInput
    upsert?: OrganizationUpsertWithoutTimesheetsInput
    disconnect?: OrganizationWhereInput | boolean
    delete?: OrganizationWhereInput | boolean
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutTimesheetsInput, OrganizationUpdateWithoutTimesheetsInput>, OrganizationUncheckedUpdateWithoutTimesheetsInput>
  }

  export type TimesheetEntryUpdateManyWithoutTimesheetNestedInput = {
    create?: XOR<TimesheetEntryCreateWithoutTimesheetInput, TimesheetEntryUncheckedCreateWithoutTimesheetInput> | TimesheetEntryCreateWithoutTimesheetInput[] | TimesheetEntryUncheckedCreateWithoutTimesheetInput[]
    connectOrCreate?: TimesheetEntryCreateOrConnectWithoutTimesheetInput | TimesheetEntryCreateOrConnectWithoutTimesheetInput[]
    upsert?: TimesheetEntryUpsertWithWhereUniqueWithoutTimesheetInput | TimesheetEntryUpsertWithWhereUniqueWithoutTimesheetInput[]
    createMany?: TimesheetEntryCreateManyTimesheetInputEnvelope
    set?: TimesheetEntryWhereUniqueInput | TimesheetEntryWhereUniqueInput[]
    disconnect?: TimesheetEntryWhereUniqueInput | TimesheetEntryWhereUniqueInput[]
    delete?: TimesheetEntryWhereUniqueInput | TimesheetEntryWhereUniqueInput[]
    connect?: TimesheetEntryWhereUniqueInput | TimesheetEntryWhereUniqueInput[]
    update?: TimesheetEntryUpdateWithWhereUniqueWithoutTimesheetInput | TimesheetEntryUpdateWithWhereUniqueWithoutTimesheetInput[]
    updateMany?: TimesheetEntryUpdateManyWithWhereWithoutTimesheetInput | TimesheetEntryUpdateManyWithWhereWithoutTimesheetInput[]
    deleteMany?: TimesheetEntryScalarWhereInput | TimesheetEntryScalarWhereInput[]
  }

  export type ProjectUpdateOneWithoutTimesheetsNestedInput = {
    create?: XOR<ProjectCreateWithoutTimesheetsInput, ProjectUncheckedCreateWithoutTimesheetsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutTimesheetsInput
    upsert?: ProjectUpsertWithoutTimesheetsInput
    disconnect?: ProjectWhereInput | boolean
    delete?: ProjectWhereInput | boolean
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutTimesheetsInput, ProjectUpdateWithoutTimesheetsInput>, ProjectUncheckedUpdateWithoutTimesheetsInput>
  }

  export type TimesheetEntryUncheckedUpdateManyWithoutTimesheetNestedInput = {
    create?: XOR<TimesheetEntryCreateWithoutTimesheetInput, TimesheetEntryUncheckedCreateWithoutTimesheetInput> | TimesheetEntryCreateWithoutTimesheetInput[] | TimesheetEntryUncheckedCreateWithoutTimesheetInput[]
    connectOrCreate?: TimesheetEntryCreateOrConnectWithoutTimesheetInput | TimesheetEntryCreateOrConnectWithoutTimesheetInput[]
    upsert?: TimesheetEntryUpsertWithWhereUniqueWithoutTimesheetInput | TimesheetEntryUpsertWithWhereUniqueWithoutTimesheetInput[]
    createMany?: TimesheetEntryCreateManyTimesheetInputEnvelope
    set?: TimesheetEntryWhereUniqueInput | TimesheetEntryWhereUniqueInput[]
    disconnect?: TimesheetEntryWhereUniqueInput | TimesheetEntryWhereUniqueInput[]
    delete?: TimesheetEntryWhereUniqueInput | TimesheetEntryWhereUniqueInput[]
    connect?: TimesheetEntryWhereUniqueInput | TimesheetEntryWhereUniqueInput[]
    update?: TimesheetEntryUpdateWithWhereUniqueWithoutTimesheetInput | TimesheetEntryUpdateWithWhereUniqueWithoutTimesheetInput[]
    updateMany?: TimesheetEntryUpdateManyWithWhereWithoutTimesheetInput | TimesheetEntryUpdateManyWithWhereWithoutTimesheetInput[]
    deleteMany?: TimesheetEntryScalarWhereInput | TimesheetEntryScalarWhereInput[]
  }

  export type TimesheetCreateNestedOneWithoutEntriesInput = {
    create?: XOR<TimesheetCreateWithoutEntriesInput, TimesheetUncheckedCreateWithoutEntriesInput>
    connectOrCreate?: TimesheetCreateOrConnectWithoutEntriesInput
    connect?: TimesheetWhereUniqueInput
  }

  export type ExpenseCreateNestedManyWithoutTimesheetEntryInput = {
    create?: XOR<ExpenseCreateWithoutTimesheetEntryInput, ExpenseUncheckedCreateWithoutTimesheetEntryInput> | ExpenseCreateWithoutTimesheetEntryInput[] | ExpenseUncheckedCreateWithoutTimesheetEntryInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutTimesheetEntryInput | ExpenseCreateOrConnectWithoutTimesheetEntryInput[]
    createMany?: ExpenseCreateManyTimesheetEntryInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type ExpenseUncheckedCreateNestedManyWithoutTimesheetEntryInput = {
    create?: XOR<ExpenseCreateWithoutTimesheetEntryInput, ExpenseUncheckedCreateWithoutTimesheetEntryInput> | ExpenseCreateWithoutTimesheetEntryInput[] | ExpenseUncheckedCreateWithoutTimesheetEntryInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutTimesheetEntryInput | ExpenseCreateOrConnectWithoutTimesheetEntryInput[]
    createMany?: ExpenseCreateManyTimesheetEntryInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type TimesheetUpdateOneRequiredWithoutEntriesNestedInput = {
    create?: XOR<TimesheetCreateWithoutEntriesInput, TimesheetUncheckedCreateWithoutEntriesInput>
    connectOrCreate?: TimesheetCreateOrConnectWithoutEntriesInput
    upsert?: TimesheetUpsertWithoutEntriesInput
    connect?: TimesheetWhereUniqueInput
    update?: XOR<XOR<TimesheetUpdateToOneWithWhereWithoutEntriesInput, TimesheetUpdateWithoutEntriesInput>, TimesheetUncheckedUpdateWithoutEntriesInput>
  }

  export type ExpenseUpdateManyWithoutTimesheetEntryNestedInput = {
    create?: XOR<ExpenseCreateWithoutTimesheetEntryInput, ExpenseUncheckedCreateWithoutTimesheetEntryInput> | ExpenseCreateWithoutTimesheetEntryInput[] | ExpenseUncheckedCreateWithoutTimesheetEntryInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutTimesheetEntryInput | ExpenseCreateOrConnectWithoutTimesheetEntryInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutTimesheetEntryInput | ExpenseUpsertWithWhereUniqueWithoutTimesheetEntryInput[]
    createMany?: ExpenseCreateManyTimesheetEntryInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutTimesheetEntryInput | ExpenseUpdateWithWhereUniqueWithoutTimesheetEntryInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutTimesheetEntryInput | ExpenseUpdateManyWithWhereWithoutTimesheetEntryInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type ExpenseUncheckedUpdateManyWithoutTimesheetEntryNestedInput = {
    create?: XOR<ExpenseCreateWithoutTimesheetEntryInput, ExpenseUncheckedCreateWithoutTimesheetEntryInput> | ExpenseCreateWithoutTimesheetEntryInput[] | ExpenseUncheckedCreateWithoutTimesheetEntryInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutTimesheetEntryInput | ExpenseCreateOrConnectWithoutTimesheetEntryInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutTimesheetEntryInput | ExpenseUpsertWithWhereUniqueWithoutTimesheetEntryInput[]
    createMany?: ExpenseCreateManyTimesheetEntryInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutTimesheetEntryInput | ExpenseUpdateWithWhereUniqueWithoutTimesheetEntryInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutTimesheetEntryInput | ExpenseUpdateManyWithWhereWithoutTimesheetEntryInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type BudgetCreateNestedManyWithoutProjectInput = {
    create?: XOR<BudgetCreateWithoutProjectInput, BudgetUncheckedCreateWithoutProjectInput> | BudgetCreateWithoutProjectInput[] | BudgetUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutProjectInput | BudgetCreateOrConnectWithoutProjectInput[]
    createMany?: BudgetCreateManyProjectInputEnvelope
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
  }

  export type ExpenseCreateNestedManyWithoutProjectInput = {
    create?: XOR<ExpenseCreateWithoutProjectInput, ExpenseUncheckedCreateWithoutProjectInput> | ExpenseCreateWithoutProjectInput[] | ExpenseUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutProjectInput | ExpenseCreateOrConnectWithoutProjectInput[]
    createMany?: ExpenseCreateManyProjectInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type TimesheetCreateNestedManyWithoutProjectInput = {
    create?: XOR<TimesheetCreateWithoutProjectInput, TimesheetUncheckedCreateWithoutProjectInput> | TimesheetCreateWithoutProjectInput[] | TimesheetUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TimesheetCreateOrConnectWithoutProjectInput | TimesheetCreateOrConnectWithoutProjectInput[]
    createMany?: TimesheetCreateManyProjectInputEnvelope
    connect?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
  }

  export type BudgetUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<BudgetCreateWithoutProjectInput, BudgetUncheckedCreateWithoutProjectInput> | BudgetCreateWithoutProjectInput[] | BudgetUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutProjectInput | BudgetCreateOrConnectWithoutProjectInput[]
    createMany?: BudgetCreateManyProjectInputEnvelope
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
  }

  export type ExpenseUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ExpenseCreateWithoutProjectInput, ExpenseUncheckedCreateWithoutProjectInput> | ExpenseCreateWithoutProjectInput[] | ExpenseUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutProjectInput | ExpenseCreateOrConnectWithoutProjectInput[]
    createMany?: ExpenseCreateManyProjectInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type TimesheetUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<TimesheetCreateWithoutProjectInput, TimesheetUncheckedCreateWithoutProjectInput> | TimesheetCreateWithoutProjectInput[] | TimesheetUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TimesheetCreateOrConnectWithoutProjectInput | TimesheetCreateOrConnectWithoutProjectInput[]
    createMany?: TimesheetCreateManyProjectInputEnvelope
    connect?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
  }

  export type BudgetUpdateManyWithoutProjectNestedInput = {
    create?: XOR<BudgetCreateWithoutProjectInput, BudgetUncheckedCreateWithoutProjectInput> | BudgetCreateWithoutProjectInput[] | BudgetUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutProjectInput | BudgetCreateOrConnectWithoutProjectInput[]
    upsert?: BudgetUpsertWithWhereUniqueWithoutProjectInput | BudgetUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: BudgetCreateManyProjectInputEnvelope
    set?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    disconnect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    delete?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    update?: BudgetUpdateWithWhereUniqueWithoutProjectInput | BudgetUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: BudgetUpdateManyWithWhereWithoutProjectInput | BudgetUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: BudgetScalarWhereInput | BudgetScalarWhereInput[]
  }

  export type ExpenseUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ExpenseCreateWithoutProjectInput, ExpenseUncheckedCreateWithoutProjectInput> | ExpenseCreateWithoutProjectInput[] | ExpenseUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutProjectInput | ExpenseCreateOrConnectWithoutProjectInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutProjectInput | ExpenseUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ExpenseCreateManyProjectInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutProjectInput | ExpenseUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutProjectInput | ExpenseUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type TimesheetUpdateManyWithoutProjectNestedInput = {
    create?: XOR<TimesheetCreateWithoutProjectInput, TimesheetUncheckedCreateWithoutProjectInput> | TimesheetCreateWithoutProjectInput[] | TimesheetUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TimesheetCreateOrConnectWithoutProjectInput | TimesheetCreateOrConnectWithoutProjectInput[]
    upsert?: TimesheetUpsertWithWhereUniqueWithoutProjectInput | TimesheetUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: TimesheetCreateManyProjectInputEnvelope
    set?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
    disconnect?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
    delete?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
    connect?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
    update?: TimesheetUpdateWithWhereUniqueWithoutProjectInput | TimesheetUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: TimesheetUpdateManyWithWhereWithoutProjectInput | TimesheetUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: TimesheetScalarWhereInput | TimesheetScalarWhereInput[]
  }

  export type BudgetUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<BudgetCreateWithoutProjectInput, BudgetUncheckedCreateWithoutProjectInput> | BudgetCreateWithoutProjectInput[] | BudgetUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutProjectInput | BudgetCreateOrConnectWithoutProjectInput[]
    upsert?: BudgetUpsertWithWhereUniqueWithoutProjectInput | BudgetUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: BudgetCreateManyProjectInputEnvelope
    set?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    disconnect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    delete?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    update?: BudgetUpdateWithWhereUniqueWithoutProjectInput | BudgetUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: BudgetUpdateManyWithWhereWithoutProjectInput | BudgetUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: BudgetScalarWhereInput | BudgetScalarWhereInput[]
  }

  export type ExpenseUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ExpenseCreateWithoutProjectInput, ExpenseUncheckedCreateWithoutProjectInput> | ExpenseCreateWithoutProjectInput[] | ExpenseUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutProjectInput | ExpenseCreateOrConnectWithoutProjectInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutProjectInput | ExpenseUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ExpenseCreateManyProjectInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutProjectInput | ExpenseUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutProjectInput | ExpenseUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type TimesheetUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<TimesheetCreateWithoutProjectInput, TimesheetUncheckedCreateWithoutProjectInput> | TimesheetCreateWithoutProjectInput[] | TimesheetUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TimesheetCreateOrConnectWithoutProjectInput | TimesheetCreateOrConnectWithoutProjectInput[]
    upsert?: TimesheetUpsertWithWhereUniqueWithoutProjectInput | TimesheetUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: TimesheetCreateManyProjectInputEnvelope
    set?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
    disconnect?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
    delete?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
    connect?: TimesheetWhereUniqueInput | TimesheetWhereUniqueInput[]
    update?: TimesheetUpdateWithWhereUniqueWithoutProjectInput | TimesheetUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: TimesheetUpdateManyWithWhereWithoutProjectInput | TimesheetUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: TimesheetScalarWhereInput | TimesheetScalarWhereInput[]
  }

  export type OrganizationCreateNestedOneWithoutSubscriptionInput = {
    create?: XOR<OrganizationCreateWithoutSubscriptionInput, OrganizationUncheckedCreateWithoutSubscriptionInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutSubscriptionInput
    connect?: OrganizationWhereUniqueInput
  }

  export type OrganizationUpdateOneRequiredWithoutSubscriptionNestedInput = {
    create?: XOR<OrganizationCreateWithoutSubscriptionInput, OrganizationUncheckedCreateWithoutSubscriptionInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutSubscriptionInput
    upsert?: OrganizationUpsertWithoutSubscriptionInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutSubscriptionInput, OrganizationUpdateWithoutSubscriptionInput>, OrganizationUncheckedUpdateWithoutSubscriptionInput>
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumInvitationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InvitationStatus | EnumInvitationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvitationStatusFilter<$PrismaModel> | $Enums.InvitationStatus
  }

  export type NestedEnumInvitationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InvitationStatus | EnumInvitationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvitationStatusWithAggregatesFilter<$PrismaModel> | $Enums.InvitationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInvitationStatusFilter<$PrismaModel>
    _max?: NestedEnumInvitationStatusFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type OrganizationCreateWithoutMembersInput = {
    id?: string
    name: string
    email?: string | null
    description?: string | null
    logo?: string | null
    website?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    owner?: UserCreateNestedOneWithoutOwnedOrganizationInput
    invitations?: UserInvitationCreateNestedManyWithoutOrganizationInput
    budgets?: BudgetCreateNestedManyWithoutOrganizationInput
    expenses?: ExpenseCreateNestedManyWithoutOrganizationInput
    timesheets?: TimesheetCreateNestedManyWithoutOrganizationInput
    subscription?: SubscriptionCreateNestedOneWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutMembersInput = {
    id?: string
    name: string
    email?: string | null
    description?: string | null
    logo?: string | null
    website?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    ownerId?: string | null
    invitations?: UserInvitationUncheckedCreateNestedManyWithoutOrganizationInput
    budgets?: BudgetUncheckedCreateNestedManyWithoutOrganizationInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutOrganizationInput
    timesheets?: TimesheetUncheckedCreateNestedManyWithoutOrganizationInput
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutMembersInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutMembersInput, OrganizationUncheckedCreateWithoutMembersInput>
  }

  export type OrganizationCreateWithoutOwnerInput = {
    id?: string
    name: string
    email?: string | null
    description?: string | null
    logo?: string | null
    website?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    members?: UserCreateNestedManyWithoutOrganizationInput
    invitations?: UserInvitationCreateNestedManyWithoutOrganizationInput
    budgets?: BudgetCreateNestedManyWithoutOrganizationInput
    expenses?: ExpenseCreateNestedManyWithoutOrganizationInput
    timesheets?: TimesheetCreateNestedManyWithoutOrganizationInput
    subscription?: SubscriptionCreateNestedOneWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutOwnerInput = {
    id?: string
    name: string
    email?: string | null
    description?: string | null
    logo?: string | null
    website?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    members?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    invitations?: UserInvitationUncheckedCreateNestedManyWithoutOrganizationInput
    budgets?: BudgetUncheckedCreateNestedManyWithoutOrganizationInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutOrganizationInput
    timesheets?: TimesheetUncheckedCreateNestedManyWithoutOrganizationInput
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutOwnerInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutOwnerInput, OrganizationUncheckedCreateWithoutOwnerInput>
  }

  export type BudgetCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    amount: number
    startDate: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organization?: OrganizationCreateNestedOneWithoutBudgetsInput
    categories?: BudgetCategoryCreateNestedManyWithoutBudgetInput
    expenses?: ExpenseCreateNestedManyWithoutBudgetInput
    project?: ProjectCreateNestedOneWithoutBudgetsInput
  }

  export type BudgetUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    amount: number
    startDate: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizationId?: string | null
    projectId?: string | null
    categories?: BudgetCategoryUncheckedCreateNestedManyWithoutBudgetInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutBudgetInput
  }

  export type BudgetCreateOrConnectWithoutUserInput = {
    where: BudgetWhereUniqueInput
    create: XOR<BudgetCreateWithoutUserInput, BudgetUncheckedCreateWithoutUserInput>
  }

  export type BudgetCreateManyUserInputEnvelope = {
    data: BudgetCreateManyUserInput | BudgetCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ExpenseCreateWithoutUserInput = {
    id?: string
    title: string
    description?: string | null
    amount: number
    date: Date | string
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organization?: OrganizationCreateNestedOneWithoutExpensesInput
    budget?: BudgetCreateNestedOneWithoutExpensesInput
    category?: BudgetCategoryCreateNestedOneWithoutExpensesInput
    timesheetEntry?: TimesheetEntryCreateNestedOneWithoutExpensesInput
    project?: ProjectCreateNestedOneWithoutExpensesInput
  }

  export type ExpenseUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    description?: string | null
    amount: number
    date: Date | string
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizationId?: string | null
    budgetId?: string | null
    categoryId?: string | null
    timesheetEntryId?: string | null
    projectId?: string | null
  }

  export type ExpenseCreateOrConnectWithoutUserInput = {
    where: ExpenseWhereUniqueInput
    create: XOR<ExpenseCreateWithoutUserInput, ExpenseUncheckedCreateWithoutUserInput>
  }

  export type ExpenseCreateManyUserInputEnvelope = {
    data: ExpenseCreateManyUserInput | ExpenseCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TimesheetCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    organization?: OrganizationCreateNestedOneWithoutTimesheetsInput
    entries?: TimesheetEntryCreateNestedManyWithoutTimesheetInput
    project?: ProjectCreateNestedOneWithoutTimesheetsInput
  }

  export type TimesheetUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    organizationId?: string | null
    projectId?: string | null
    entries?: TimesheetEntryUncheckedCreateNestedManyWithoutTimesheetInput
  }

  export type TimesheetCreateOrConnectWithoutUserInput = {
    where: TimesheetWhereUniqueInput
    create: XOR<TimesheetCreateWithoutUserInput, TimesheetUncheckedCreateWithoutUserInput>
  }

  export type TimesheetCreateManyUserInputEnvelope = {
    data: TimesheetCreateManyUserInput | TimesheetCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserInvitationCreateWithoutUserInput = {
    id?: string
    email: string
    token: string
    status?: $Enums.InvitationStatus
    role?: $Enums.UserRole
    expiresAt: Date | string
    createdAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutInvitationsInput
  }

  export type UserInvitationUncheckedCreateWithoutUserInput = {
    id?: string
    email: string
    token: string
    status?: $Enums.InvitationStatus
    role?: $Enums.UserRole
    expiresAt: Date | string
    createdAt?: Date | string
    organizationId: string
  }

  export type UserInvitationCreateOrConnectWithoutUserInput = {
    where: UserInvitationWhereUniqueInput
    create: XOR<UserInvitationCreateWithoutUserInput, UserInvitationUncheckedCreateWithoutUserInput>
  }

  export type UserInvitationCreateManyUserInputEnvelope = {
    data: UserInvitationCreateManyUserInput | UserInvitationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutUserInput = {
    id?: string
    title: string
    message: string
    isRead?: boolean
    type: string
    createdAt?: Date | string
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    message: string
    isRead?: boolean
    type: string
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutUserInput = {
    id?: string
    action: string
    entity: string
    entityId: string
    details?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutUserInput = {
    id?: string
    action: string
    entity: string
    entityId: string
    details?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogCreateManyUserInputEnvelope = {
    data: AuditLogCreateManyUserInput | AuditLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationUpsertWithoutMembersInput = {
    update: XOR<OrganizationUpdateWithoutMembersInput, OrganizationUncheckedUpdateWithoutMembersInput>
    create: XOR<OrganizationCreateWithoutMembersInput, OrganizationUncheckedCreateWithoutMembersInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutMembersInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutMembersInput, OrganizationUncheckedUpdateWithoutMembersInput>
  }

  export type OrganizationUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    owner?: UserUpdateOneWithoutOwnedOrganizationNestedInput
    invitations?: UserInvitationUpdateManyWithoutOrganizationNestedInput
    budgets?: BudgetUpdateManyWithoutOrganizationNestedInput
    expenses?: ExpenseUpdateManyWithoutOrganizationNestedInput
    timesheets?: TimesheetUpdateManyWithoutOrganizationNestedInput
    subscription?: SubscriptionUpdateOneWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    invitations?: UserInvitationUncheckedUpdateManyWithoutOrganizationNestedInput
    budgets?: BudgetUncheckedUpdateManyWithoutOrganizationNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutOrganizationNestedInput
    timesheets?: TimesheetUncheckedUpdateManyWithoutOrganizationNestedInput
    subscription?: SubscriptionUncheckedUpdateOneWithoutOrganizationNestedInput
  }

  export type OrganizationUpsertWithoutOwnerInput = {
    update: XOR<OrganizationUpdateWithoutOwnerInput, OrganizationUncheckedUpdateWithoutOwnerInput>
    create: XOR<OrganizationCreateWithoutOwnerInput, OrganizationUncheckedCreateWithoutOwnerInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutOwnerInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutOwnerInput, OrganizationUncheckedUpdateWithoutOwnerInput>
  }

  export type OrganizationUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    members?: UserUpdateManyWithoutOrganizationNestedInput
    invitations?: UserInvitationUpdateManyWithoutOrganizationNestedInput
    budgets?: BudgetUpdateManyWithoutOrganizationNestedInput
    expenses?: ExpenseUpdateManyWithoutOrganizationNestedInput
    timesheets?: TimesheetUpdateManyWithoutOrganizationNestedInput
    subscription?: SubscriptionUpdateOneWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    members?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    invitations?: UserInvitationUncheckedUpdateManyWithoutOrganizationNestedInput
    budgets?: BudgetUncheckedUpdateManyWithoutOrganizationNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutOrganizationNestedInput
    timesheets?: TimesheetUncheckedUpdateManyWithoutOrganizationNestedInput
    subscription?: SubscriptionUncheckedUpdateOneWithoutOrganizationNestedInput
  }

  export type BudgetUpsertWithWhereUniqueWithoutUserInput = {
    where: BudgetWhereUniqueInput
    update: XOR<BudgetUpdateWithoutUserInput, BudgetUncheckedUpdateWithoutUserInput>
    create: XOR<BudgetCreateWithoutUserInput, BudgetUncheckedCreateWithoutUserInput>
  }

  export type BudgetUpdateWithWhereUniqueWithoutUserInput = {
    where: BudgetWhereUniqueInput
    data: XOR<BudgetUpdateWithoutUserInput, BudgetUncheckedUpdateWithoutUserInput>
  }

  export type BudgetUpdateManyWithWhereWithoutUserInput = {
    where: BudgetScalarWhereInput
    data: XOR<BudgetUpdateManyMutationInput, BudgetUncheckedUpdateManyWithoutUserInput>
  }

  export type BudgetScalarWhereInput = {
    AND?: BudgetScalarWhereInput | BudgetScalarWhereInput[]
    OR?: BudgetScalarWhereInput[]
    NOT?: BudgetScalarWhereInput | BudgetScalarWhereInput[]
    id?: StringFilter<"Budget"> | string
    name?: StringFilter<"Budget"> | string
    description?: StringNullableFilter<"Budget"> | string | null
    amount?: FloatFilter<"Budget"> | number
    startDate?: DateTimeFilter<"Budget"> | Date | string
    endDate?: DateTimeNullableFilter<"Budget"> | Date | string | null
    createdAt?: DateTimeFilter<"Budget"> | Date | string
    updatedAt?: DateTimeFilter<"Budget"> | Date | string
    userId?: StringNullableFilter<"Budget"> | string | null
    organizationId?: StringNullableFilter<"Budget"> | string | null
    projectId?: StringNullableFilter<"Budget"> | string | null
  }

  export type ExpenseUpsertWithWhereUniqueWithoutUserInput = {
    where: ExpenseWhereUniqueInput
    update: XOR<ExpenseUpdateWithoutUserInput, ExpenseUncheckedUpdateWithoutUserInput>
    create: XOR<ExpenseCreateWithoutUserInput, ExpenseUncheckedCreateWithoutUserInput>
  }

  export type ExpenseUpdateWithWhereUniqueWithoutUserInput = {
    where: ExpenseWhereUniqueInput
    data: XOR<ExpenseUpdateWithoutUserInput, ExpenseUncheckedUpdateWithoutUserInput>
  }

  export type ExpenseUpdateManyWithWhereWithoutUserInput = {
    where: ExpenseScalarWhereInput
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyWithoutUserInput>
  }

  export type ExpenseScalarWhereInput = {
    AND?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
    OR?: ExpenseScalarWhereInput[]
    NOT?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
    id?: StringFilter<"Expense"> | string
    title?: StringFilter<"Expense"> | string
    description?: StringNullableFilter<"Expense"> | string | null
    amount?: FloatFilter<"Expense"> | number
    date?: DateTimeFilter<"Expense"> | Date | string
    receiptUrl?: StringNullableFilter<"Expense"> | string | null
    createdAt?: DateTimeFilter<"Expense"> | Date | string
    updatedAt?: DateTimeFilter<"Expense"> | Date | string
    userId?: StringNullableFilter<"Expense"> | string | null
    organizationId?: StringNullableFilter<"Expense"> | string | null
    budgetId?: StringNullableFilter<"Expense"> | string | null
    categoryId?: StringNullableFilter<"Expense"> | string | null
    timesheetEntryId?: StringNullableFilter<"Expense"> | string | null
    projectId?: StringNullableFilter<"Expense"> | string | null
  }

  export type TimesheetUpsertWithWhereUniqueWithoutUserInput = {
    where: TimesheetWhereUniqueInput
    update: XOR<TimesheetUpdateWithoutUserInput, TimesheetUncheckedUpdateWithoutUserInput>
    create: XOR<TimesheetCreateWithoutUserInput, TimesheetUncheckedCreateWithoutUserInput>
  }

  export type TimesheetUpdateWithWhereUniqueWithoutUserInput = {
    where: TimesheetWhereUniqueInput
    data: XOR<TimesheetUpdateWithoutUserInput, TimesheetUncheckedUpdateWithoutUserInput>
  }

  export type TimesheetUpdateManyWithWhereWithoutUserInput = {
    where: TimesheetScalarWhereInput
    data: XOR<TimesheetUpdateManyMutationInput, TimesheetUncheckedUpdateManyWithoutUserInput>
  }

  export type TimesheetScalarWhereInput = {
    AND?: TimesheetScalarWhereInput | TimesheetScalarWhereInput[]
    OR?: TimesheetScalarWhereInput[]
    NOT?: TimesheetScalarWhereInput | TimesheetScalarWhereInput[]
    id?: StringFilter<"Timesheet"> | string
    name?: StringFilter<"Timesheet"> | string
    description?: StringNullableFilter<"Timesheet"> | string | null
    startDate?: DateTimeFilter<"Timesheet"> | Date | string
    endDate?: DateTimeNullableFilter<"Timesheet"> | Date | string | null
    status?: StringFilter<"Timesheet"> | string
    createdAt?: DateTimeFilter<"Timesheet"> | Date | string
    updatedAt?: DateTimeFilter<"Timesheet"> | Date | string
    userId?: StringNullableFilter<"Timesheet"> | string | null
    organizationId?: StringNullableFilter<"Timesheet"> | string | null
    projectId?: StringNullableFilter<"Timesheet"> | string | null
  }

  export type UserInvitationUpsertWithWhereUniqueWithoutUserInput = {
    where: UserInvitationWhereUniqueInput
    update: XOR<UserInvitationUpdateWithoutUserInput, UserInvitationUncheckedUpdateWithoutUserInput>
    create: XOR<UserInvitationCreateWithoutUserInput, UserInvitationUncheckedCreateWithoutUserInput>
  }

  export type UserInvitationUpdateWithWhereUniqueWithoutUserInput = {
    where: UserInvitationWhereUniqueInput
    data: XOR<UserInvitationUpdateWithoutUserInput, UserInvitationUncheckedUpdateWithoutUserInput>
  }

  export type UserInvitationUpdateManyWithWhereWithoutUserInput = {
    where: UserInvitationScalarWhereInput
    data: XOR<UserInvitationUpdateManyMutationInput, UserInvitationUncheckedUpdateManyWithoutUserInput>
  }

  export type UserInvitationScalarWhereInput = {
    AND?: UserInvitationScalarWhereInput | UserInvitationScalarWhereInput[]
    OR?: UserInvitationScalarWhereInput[]
    NOT?: UserInvitationScalarWhereInput | UserInvitationScalarWhereInput[]
    id?: StringFilter<"UserInvitation"> | string
    email?: StringFilter<"UserInvitation"> | string
    token?: StringFilter<"UserInvitation"> | string
    status?: EnumInvitationStatusFilter<"UserInvitation"> | $Enums.InvitationStatus
    role?: EnumUserRoleFilter<"UserInvitation"> | $Enums.UserRole
    expiresAt?: DateTimeFilter<"UserInvitation"> | Date | string
    createdAt?: DateTimeFilter<"UserInvitation"> | Date | string
    organizationId?: StringFilter<"UserInvitation"> | string
    userId?: StringNullableFilter<"UserInvitation"> | string | null
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    isRead?: BoolFilter<"Notification"> | boolean
    type?: StringFilter<"Notification"> | string
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    userId?: StringFilter<"Notification"> | string
  }

  export type AuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutUserInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    entity?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    details?: StringNullableFilter<"AuditLog"> | string | null
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    userId?: StringFilter<"AuditLog"> | string
  }

  export type UserCreateWithoutOwnedOrganizationInput = {
    id?: string
    email: string
    username?: string | null
    passwordHash: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profileImage?: string | null
    phoneNumber?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    organization?: OrganizationCreateNestedOneWithoutMembersInput
    budgets?: BudgetCreateNestedManyWithoutUserInput
    expenses?: ExpenseCreateNestedManyWithoutUserInput
    timesheets?: TimesheetCreateNestedManyWithoutUserInput
    invitations?: UserInvitationCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOwnedOrganizationInput = {
    id?: string
    email: string
    username?: string | null
    passwordHash: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profileImage?: string | null
    phoneNumber?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    organizationId?: string | null
    budgets?: BudgetUncheckedCreateNestedManyWithoutUserInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutUserInput
    timesheets?: TimesheetUncheckedCreateNestedManyWithoutUserInput
    invitations?: UserInvitationUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOwnedOrganizationInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOwnedOrganizationInput, UserUncheckedCreateWithoutOwnedOrganizationInput>
  }

  export type UserCreateWithoutOrganizationInput = {
    id?: string
    email: string
    username?: string | null
    passwordHash: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profileImage?: string | null
    phoneNumber?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    ownedOrganization?: OrganizationCreateNestedOneWithoutOwnerInput
    budgets?: BudgetCreateNestedManyWithoutUserInput
    expenses?: ExpenseCreateNestedManyWithoutUserInput
    timesheets?: TimesheetCreateNestedManyWithoutUserInput
    invitations?: UserInvitationCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOrganizationInput = {
    id?: string
    email: string
    username?: string | null
    passwordHash: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profileImage?: string | null
    phoneNumber?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    ownedOrganization?: OrganizationUncheckedCreateNestedOneWithoutOwnerInput
    budgets?: BudgetUncheckedCreateNestedManyWithoutUserInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutUserInput
    timesheets?: TimesheetUncheckedCreateNestedManyWithoutUserInput
    invitations?: UserInvitationUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOrganizationInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput>
  }

  export type UserCreateManyOrganizationInputEnvelope = {
    data: UserCreateManyOrganizationInput | UserCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type UserInvitationCreateWithoutOrganizationInput = {
    id?: string
    email: string
    token: string
    status?: $Enums.InvitationStatus
    role?: $Enums.UserRole
    expiresAt: Date | string
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutInvitationsInput
  }

  export type UserInvitationUncheckedCreateWithoutOrganizationInput = {
    id?: string
    email: string
    token: string
    status?: $Enums.InvitationStatus
    role?: $Enums.UserRole
    expiresAt: Date | string
    createdAt?: Date | string
    userId?: string | null
  }

  export type UserInvitationCreateOrConnectWithoutOrganizationInput = {
    where: UserInvitationWhereUniqueInput
    create: XOR<UserInvitationCreateWithoutOrganizationInput, UserInvitationUncheckedCreateWithoutOrganizationInput>
  }

  export type UserInvitationCreateManyOrganizationInputEnvelope = {
    data: UserInvitationCreateManyOrganizationInput | UserInvitationCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type BudgetCreateWithoutOrganizationInput = {
    id?: string
    name: string
    description?: string | null
    amount: number
    startDate: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutBudgetsInput
    categories?: BudgetCategoryCreateNestedManyWithoutBudgetInput
    expenses?: ExpenseCreateNestedManyWithoutBudgetInput
    project?: ProjectCreateNestedOneWithoutBudgetsInput
  }

  export type BudgetUncheckedCreateWithoutOrganizationInput = {
    id?: string
    name: string
    description?: string | null
    amount: number
    startDate: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    projectId?: string | null
    categories?: BudgetCategoryUncheckedCreateNestedManyWithoutBudgetInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutBudgetInput
  }

  export type BudgetCreateOrConnectWithoutOrganizationInput = {
    where: BudgetWhereUniqueInput
    create: XOR<BudgetCreateWithoutOrganizationInput, BudgetUncheckedCreateWithoutOrganizationInput>
  }

  export type BudgetCreateManyOrganizationInputEnvelope = {
    data: BudgetCreateManyOrganizationInput | BudgetCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type ExpenseCreateWithoutOrganizationInput = {
    id?: string
    title: string
    description?: string | null
    amount: number
    date: Date | string
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutExpensesInput
    budget?: BudgetCreateNestedOneWithoutExpensesInput
    category?: BudgetCategoryCreateNestedOneWithoutExpensesInput
    timesheetEntry?: TimesheetEntryCreateNestedOneWithoutExpensesInput
    project?: ProjectCreateNestedOneWithoutExpensesInput
  }

  export type ExpenseUncheckedCreateWithoutOrganizationInput = {
    id?: string
    title: string
    description?: string | null
    amount: number
    date: Date | string
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    budgetId?: string | null
    categoryId?: string | null
    timesheetEntryId?: string | null
    projectId?: string | null
  }

  export type ExpenseCreateOrConnectWithoutOrganizationInput = {
    where: ExpenseWhereUniqueInput
    create: XOR<ExpenseCreateWithoutOrganizationInput, ExpenseUncheckedCreateWithoutOrganizationInput>
  }

  export type ExpenseCreateManyOrganizationInputEnvelope = {
    data: ExpenseCreateManyOrganizationInput | ExpenseCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type TimesheetCreateWithoutOrganizationInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutTimesheetsInput
    entries?: TimesheetEntryCreateNestedManyWithoutTimesheetInput
    project?: ProjectCreateNestedOneWithoutTimesheetsInput
  }

  export type TimesheetUncheckedCreateWithoutOrganizationInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    projectId?: string | null
    entries?: TimesheetEntryUncheckedCreateNestedManyWithoutTimesheetInput
  }

  export type TimesheetCreateOrConnectWithoutOrganizationInput = {
    where: TimesheetWhereUniqueInput
    create: XOR<TimesheetCreateWithoutOrganizationInput, TimesheetUncheckedCreateWithoutOrganizationInput>
  }

  export type TimesheetCreateManyOrganizationInputEnvelope = {
    data: TimesheetCreateManyOrganizationInput | TimesheetCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type SubscriptionCreateWithoutOrganizationInput = {
    id?: string
    plan: string
    status?: string
    startDate?: Date | string
    endDate?: Date | string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUncheckedCreateWithoutOrganizationInput = {
    id?: string
    plan: string
    status?: string
    startDate?: Date | string
    endDate?: Date | string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCreateOrConnectWithoutOrganizationInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutOrganizationInput, SubscriptionUncheckedCreateWithoutOrganizationInput>
  }

  export type UserUpsertWithoutOwnedOrganizationInput = {
    update: XOR<UserUpdateWithoutOwnedOrganizationInput, UserUncheckedUpdateWithoutOwnedOrganizationInput>
    create: XOR<UserCreateWithoutOwnedOrganizationInput, UserUncheckedCreateWithoutOwnedOrganizationInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOwnedOrganizationInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOwnedOrganizationInput, UserUncheckedUpdateWithoutOwnedOrganizationInput>
  }

  export type UserUpdateWithoutOwnedOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organization?: OrganizationUpdateOneWithoutMembersNestedInput
    budgets?: BudgetUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUpdateManyWithoutUserNestedInput
    timesheets?: TimesheetUpdateManyWithoutUserNestedInput
    invitations?: UserInvitationUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOwnedOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    budgets?: BudgetUncheckedUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutUserNestedInput
    timesheets?: TimesheetUncheckedUpdateManyWithoutUserNestedInput
    invitations?: UserInvitationUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutOrganizationInput, UserUncheckedUpdateWithoutOrganizationInput>
    create: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput>
  }

  export type UserUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutOrganizationInput, UserUncheckedUpdateWithoutOrganizationInput>
  }

  export type UserUpdateManyWithWhereWithoutOrganizationInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    username?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringFilter<"User"> | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    profileImage?: StringNullableFilter<"User"> | string | null
    phoneNumber?: StringNullableFilter<"User"> | string | null
    resetToken?: StringNullableFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    organizationId?: StringNullableFilter<"User"> | string | null
  }

  export type UserInvitationUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: UserInvitationWhereUniqueInput
    update: XOR<UserInvitationUpdateWithoutOrganizationInput, UserInvitationUncheckedUpdateWithoutOrganizationInput>
    create: XOR<UserInvitationCreateWithoutOrganizationInput, UserInvitationUncheckedCreateWithoutOrganizationInput>
  }

  export type UserInvitationUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: UserInvitationWhereUniqueInput
    data: XOR<UserInvitationUpdateWithoutOrganizationInput, UserInvitationUncheckedUpdateWithoutOrganizationInput>
  }

  export type UserInvitationUpdateManyWithWhereWithoutOrganizationInput = {
    where: UserInvitationScalarWhereInput
    data: XOR<UserInvitationUpdateManyMutationInput, UserInvitationUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type BudgetUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: BudgetWhereUniqueInput
    update: XOR<BudgetUpdateWithoutOrganizationInput, BudgetUncheckedUpdateWithoutOrganizationInput>
    create: XOR<BudgetCreateWithoutOrganizationInput, BudgetUncheckedCreateWithoutOrganizationInput>
  }

  export type BudgetUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: BudgetWhereUniqueInput
    data: XOR<BudgetUpdateWithoutOrganizationInput, BudgetUncheckedUpdateWithoutOrganizationInput>
  }

  export type BudgetUpdateManyWithWhereWithoutOrganizationInput = {
    where: BudgetScalarWhereInput
    data: XOR<BudgetUpdateManyMutationInput, BudgetUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type ExpenseUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: ExpenseWhereUniqueInput
    update: XOR<ExpenseUpdateWithoutOrganizationInput, ExpenseUncheckedUpdateWithoutOrganizationInput>
    create: XOR<ExpenseCreateWithoutOrganizationInput, ExpenseUncheckedCreateWithoutOrganizationInput>
  }

  export type ExpenseUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: ExpenseWhereUniqueInput
    data: XOR<ExpenseUpdateWithoutOrganizationInput, ExpenseUncheckedUpdateWithoutOrganizationInput>
  }

  export type ExpenseUpdateManyWithWhereWithoutOrganizationInput = {
    where: ExpenseScalarWhereInput
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type TimesheetUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: TimesheetWhereUniqueInput
    update: XOR<TimesheetUpdateWithoutOrganizationInput, TimesheetUncheckedUpdateWithoutOrganizationInput>
    create: XOR<TimesheetCreateWithoutOrganizationInput, TimesheetUncheckedCreateWithoutOrganizationInput>
  }

  export type TimesheetUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: TimesheetWhereUniqueInput
    data: XOR<TimesheetUpdateWithoutOrganizationInput, TimesheetUncheckedUpdateWithoutOrganizationInput>
  }

  export type TimesheetUpdateManyWithWhereWithoutOrganizationInput = {
    where: TimesheetScalarWhereInput
    data: XOR<TimesheetUpdateManyMutationInput, TimesheetUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type SubscriptionUpsertWithoutOrganizationInput = {
    update: XOR<SubscriptionUpdateWithoutOrganizationInput, SubscriptionUncheckedUpdateWithoutOrganizationInput>
    create: XOR<SubscriptionCreateWithoutOrganizationInput, SubscriptionUncheckedCreateWithoutOrganizationInput>
    where?: SubscriptionWhereInput
  }

  export type SubscriptionUpdateToOneWithWhereWithoutOrganizationInput = {
    where?: SubscriptionWhereInput
    data: XOR<SubscriptionUpdateWithoutOrganizationInput, SubscriptionUncheckedUpdateWithoutOrganizationInput>
  }

  export type SubscriptionUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationCreateWithoutInvitationsInput = {
    id?: string
    name: string
    email?: string | null
    description?: string | null
    logo?: string | null
    website?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    owner?: UserCreateNestedOneWithoutOwnedOrganizationInput
    members?: UserCreateNestedManyWithoutOrganizationInput
    budgets?: BudgetCreateNestedManyWithoutOrganizationInput
    expenses?: ExpenseCreateNestedManyWithoutOrganizationInput
    timesheets?: TimesheetCreateNestedManyWithoutOrganizationInput
    subscription?: SubscriptionCreateNestedOneWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutInvitationsInput = {
    id?: string
    name: string
    email?: string | null
    description?: string | null
    logo?: string | null
    website?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    ownerId?: string | null
    members?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    budgets?: BudgetUncheckedCreateNestedManyWithoutOrganizationInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutOrganizationInput
    timesheets?: TimesheetUncheckedCreateNestedManyWithoutOrganizationInput
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutInvitationsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutInvitationsInput, OrganizationUncheckedCreateWithoutInvitationsInput>
  }

  export type UserCreateWithoutInvitationsInput = {
    id?: string
    email: string
    username?: string | null
    passwordHash: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profileImage?: string | null
    phoneNumber?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    organization?: OrganizationCreateNestedOneWithoutMembersInput
    ownedOrganization?: OrganizationCreateNestedOneWithoutOwnerInput
    budgets?: BudgetCreateNestedManyWithoutUserInput
    expenses?: ExpenseCreateNestedManyWithoutUserInput
    timesheets?: TimesheetCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutInvitationsInput = {
    id?: string
    email: string
    username?: string | null
    passwordHash: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profileImage?: string | null
    phoneNumber?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    organizationId?: string | null
    ownedOrganization?: OrganizationUncheckedCreateNestedOneWithoutOwnerInput
    budgets?: BudgetUncheckedCreateNestedManyWithoutUserInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutUserInput
    timesheets?: TimesheetUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutInvitationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInvitationsInput, UserUncheckedCreateWithoutInvitationsInput>
  }

  export type OrganizationUpsertWithoutInvitationsInput = {
    update: XOR<OrganizationUpdateWithoutInvitationsInput, OrganizationUncheckedUpdateWithoutInvitationsInput>
    create: XOR<OrganizationCreateWithoutInvitationsInput, OrganizationUncheckedCreateWithoutInvitationsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutInvitationsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutInvitationsInput, OrganizationUncheckedUpdateWithoutInvitationsInput>
  }

  export type OrganizationUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    owner?: UserUpdateOneWithoutOwnedOrganizationNestedInput
    members?: UserUpdateManyWithoutOrganizationNestedInput
    budgets?: BudgetUpdateManyWithoutOrganizationNestedInput
    expenses?: ExpenseUpdateManyWithoutOrganizationNestedInput
    timesheets?: TimesheetUpdateManyWithoutOrganizationNestedInput
    subscription?: SubscriptionUpdateOneWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    members?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    budgets?: BudgetUncheckedUpdateManyWithoutOrganizationNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutOrganizationNestedInput
    timesheets?: TimesheetUncheckedUpdateManyWithoutOrganizationNestedInput
    subscription?: SubscriptionUncheckedUpdateOneWithoutOrganizationNestedInput
  }

  export type UserUpsertWithoutInvitationsInput = {
    update: XOR<UserUpdateWithoutInvitationsInput, UserUncheckedUpdateWithoutInvitationsInput>
    create: XOR<UserCreateWithoutInvitationsInput, UserUncheckedCreateWithoutInvitationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInvitationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInvitationsInput, UserUncheckedUpdateWithoutInvitationsInput>
  }

  export type UserUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organization?: OrganizationUpdateOneWithoutMembersNestedInput
    ownedOrganization?: OrganizationUpdateOneWithoutOwnerNestedInput
    budgets?: BudgetUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUpdateManyWithoutUserNestedInput
    timesheets?: TimesheetUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    ownedOrganization?: OrganizationUncheckedUpdateOneWithoutOwnerNestedInput
    budgets?: BudgetUncheckedUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutUserNestedInput
    timesheets?: TimesheetUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutBudgetsInput = {
    id?: string
    email: string
    username?: string | null
    passwordHash: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profileImage?: string | null
    phoneNumber?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    organization?: OrganizationCreateNestedOneWithoutMembersInput
    ownedOrganization?: OrganizationCreateNestedOneWithoutOwnerInput
    expenses?: ExpenseCreateNestedManyWithoutUserInput
    timesheets?: TimesheetCreateNestedManyWithoutUserInput
    invitations?: UserInvitationCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBudgetsInput = {
    id?: string
    email: string
    username?: string | null
    passwordHash: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profileImage?: string | null
    phoneNumber?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    organizationId?: string | null
    ownedOrganization?: OrganizationUncheckedCreateNestedOneWithoutOwnerInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutUserInput
    timesheets?: TimesheetUncheckedCreateNestedManyWithoutUserInput
    invitations?: UserInvitationUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBudgetsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBudgetsInput, UserUncheckedCreateWithoutBudgetsInput>
  }

  export type OrganizationCreateWithoutBudgetsInput = {
    id?: string
    name: string
    email?: string | null
    description?: string | null
    logo?: string | null
    website?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    owner?: UserCreateNestedOneWithoutOwnedOrganizationInput
    members?: UserCreateNestedManyWithoutOrganizationInput
    invitations?: UserInvitationCreateNestedManyWithoutOrganizationInput
    expenses?: ExpenseCreateNestedManyWithoutOrganizationInput
    timesheets?: TimesheetCreateNestedManyWithoutOrganizationInput
    subscription?: SubscriptionCreateNestedOneWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutBudgetsInput = {
    id?: string
    name: string
    email?: string | null
    description?: string | null
    logo?: string | null
    website?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    ownerId?: string | null
    members?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    invitations?: UserInvitationUncheckedCreateNestedManyWithoutOrganizationInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutOrganizationInput
    timesheets?: TimesheetUncheckedCreateNestedManyWithoutOrganizationInput
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutBudgetsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutBudgetsInput, OrganizationUncheckedCreateWithoutBudgetsInput>
  }

  export type BudgetCategoryCreateWithoutBudgetInput = {
    id?: string
    name: string
    description?: string | null
    allocatedAmount: number
    createdAt?: Date | string
    updatedAt?: Date | string
    expenses?: ExpenseCreateNestedManyWithoutCategoryInput
  }

  export type BudgetCategoryUncheckedCreateWithoutBudgetInput = {
    id?: string
    name: string
    description?: string | null
    allocatedAmount: number
    createdAt?: Date | string
    updatedAt?: Date | string
    expenses?: ExpenseUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type BudgetCategoryCreateOrConnectWithoutBudgetInput = {
    where: BudgetCategoryWhereUniqueInput
    create: XOR<BudgetCategoryCreateWithoutBudgetInput, BudgetCategoryUncheckedCreateWithoutBudgetInput>
  }

  export type BudgetCategoryCreateManyBudgetInputEnvelope = {
    data: BudgetCategoryCreateManyBudgetInput | BudgetCategoryCreateManyBudgetInput[]
    skipDuplicates?: boolean
  }

  export type ExpenseCreateWithoutBudgetInput = {
    id?: string
    title: string
    description?: string | null
    amount: number
    date: Date | string
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutExpensesInput
    organization?: OrganizationCreateNestedOneWithoutExpensesInput
    category?: BudgetCategoryCreateNestedOneWithoutExpensesInput
    timesheetEntry?: TimesheetEntryCreateNestedOneWithoutExpensesInput
    project?: ProjectCreateNestedOneWithoutExpensesInput
  }

  export type ExpenseUncheckedCreateWithoutBudgetInput = {
    id?: string
    title: string
    description?: string | null
    amount: number
    date: Date | string
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    organizationId?: string | null
    categoryId?: string | null
    timesheetEntryId?: string | null
    projectId?: string | null
  }

  export type ExpenseCreateOrConnectWithoutBudgetInput = {
    where: ExpenseWhereUniqueInput
    create: XOR<ExpenseCreateWithoutBudgetInput, ExpenseUncheckedCreateWithoutBudgetInput>
  }

  export type ExpenseCreateManyBudgetInputEnvelope = {
    data: ExpenseCreateManyBudgetInput | ExpenseCreateManyBudgetInput[]
    skipDuplicates?: boolean
  }

  export type ProjectCreateWithoutBudgetsInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    expenses?: ExpenseCreateNestedManyWithoutProjectInput
    timesheets?: TimesheetCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutBudgetsInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    expenses?: ExpenseUncheckedCreateNestedManyWithoutProjectInput
    timesheets?: TimesheetUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutBudgetsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutBudgetsInput, ProjectUncheckedCreateWithoutBudgetsInput>
  }

  export type UserUpsertWithoutBudgetsInput = {
    update: XOR<UserUpdateWithoutBudgetsInput, UserUncheckedUpdateWithoutBudgetsInput>
    create: XOR<UserCreateWithoutBudgetsInput, UserUncheckedCreateWithoutBudgetsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBudgetsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBudgetsInput, UserUncheckedUpdateWithoutBudgetsInput>
  }

  export type UserUpdateWithoutBudgetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organization?: OrganizationUpdateOneWithoutMembersNestedInput
    ownedOrganization?: OrganizationUpdateOneWithoutOwnerNestedInput
    expenses?: ExpenseUpdateManyWithoutUserNestedInput
    timesheets?: TimesheetUpdateManyWithoutUserNestedInput
    invitations?: UserInvitationUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBudgetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    ownedOrganization?: OrganizationUncheckedUpdateOneWithoutOwnerNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutUserNestedInput
    timesheets?: TimesheetUncheckedUpdateManyWithoutUserNestedInput
    invitations?: UserInvitationUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OrganizationUpsertWithoutBudgetsInput = {
    update: XOR<OrganizationUpdateWithoutBudgetsInput, OrganizationUncheckedUpdateWithoutBudgetsInput>
    create: XOR<OrganizationCreateWithoutBudgetsInput, OrganizationUncheckedCreateWithoutBudgetsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutBudgetsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutBudgetsInput, OrganizationUncheckedUpdateWithoutBudgetsInput>
  }

  export type OrganizationUpdateWithoutBudgetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    owner?: UserUpdateOneWithoutOwnedOrganizationNestedInput
    members?: UserUpdateManyWithoutOrganizationNestedInput
    invitations?: UserInvitationUpdateManyWithoutOrganizationNestedInput
    expenses?: ExpenseUpdateManyWithoutOrganizationNestedInput
    timesheets?: TimesheetUpdateManyWithoutOrganizationNestedInput
    subscription?: SubscriptionUpdateOneWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutBudgetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    members?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    invitations?: UserInvitationUncheckedUpdateManyWithoutOrganizationNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutOrganizationNestedInput
    timesheets?: TimesheetUncheckedUpdateManyWithoutOrganizationNestedInput
    subscription?: SubscriptionUncheckedUpdateOneWithoutOrganizationNestedInput
  }

  export type BudgetCategoryUpsertWithWhereUniqueWithoutBudgetInput = {
    where: BudgetCategoryWhereUniqueInput
    update: XOR<BudgetCategoryUpdateWithoutBudgetInput, BudgetCategoryUncheckedUpdateWithoutBudgetInput>
    create: XOR<BudgetCategoryCreateWithoutBudgetInput, BudgetCategoryUncheckedCreateWithoutBudgetInput>
  }

  export type BudgetCategoryUpdateWithWhereUniqueWithoutBudgetInput = {
    where: BudgetCategoryWhereUniqueInput
    data: XOR<BudgetCategoryUpdateWithoutBudgetInput, BudgetCategoryUncheckedUpdateWithoutBudgetInput>
  }

  export type BudgetCategoryUpdateManyWithWhereWithoutBudgetInput = {
    where: BudgetCategoryScalarWhereInput
    data: XOR<BudgetCategoryUpdateManyMutationInput, BudgetCategoryUncheckedUpdateManyWithoutBudgetInput>
  }

  export type BudgetCategoryScalarWhereInput = {
    AND?: BudgetCategoryScalarWhereInput | BudgetCategoryScalarWhereInput[]
    OR?: BudgetCategoryScalarWhereInput[]
    NOT?: BudgetCategoryScalarWhereInput | BudgetCategoryScalarWhereInput[]
    id?: StringFilter<"BudgetCategory"> | string
    name?: StringFilter<"BudgetCategory"> | string
    description?: StringNullableFilter<"BudgetCategory"> | string | null
    allocatedAmount?: FloatFilter<"BudgetCategory"> | number
    createdAt?: DateTimeFilter<"BudgetCategory"> | Date | string
    updatedAt?: DateTimeFilter<"BudgetCategory"> | Date | string
    budgetId?: StringFilter<"BudgetCategory"> | string
  }

  export type ExpenseUpsertWithWhereUniqueWithoutBudgetInput = {
    where: ExpenseWhereUniqueInput
    update: XOR<ExpenseUpdateWithoutBudgetInput, ExpenseUncheckedUpdateWithoutBudgetInput>
    create: XOR<ExpenseCreateWithoutBudgetInput, ExpenseUncheckedCreateWithoutBudgetInput>
  }

  export type ExpenseUpdateWithWhereUniqueWithoutBudgetInput = {
    where: ExpenseWhereUniqueInput
    data: XOR<ExpenseUpdateWithoutBudgetInput, ExpenseUncheckedUpdateWithoutBudgetInput>
  }

  export type ExpenseUpdateManyWithWhereWithoutBudgetInput = {
    where: ExpenseScalarWhereInput
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyWithoutBudgetInput>
  }

  export type ProjectUpsertWithoutBudgetsInput = {
    update: XOR<ProjectUpdateWithoutBudgetsInput, ProjectUncheckedUpdateWithoutBudgetsInput>
    create: XOR<ProjectCreateWithoutBudgetsInput, ProjectUncheckedCreateWithoutBudgetsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutBudgetsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutBudgetsInput, ProjectUncheckedUpdateWithoutBudgetsInput>
  }

  export type ProjectUpdateWithoutBudgetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expenses?: ExpenseUpdateManyWithoutProjectNestedInput
    timesheets?: TimesheetUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutBudgetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expenses?: ExpenseUncheckedUpdateManyWithoutProjectNestedInput
    timesheets?: TimesheetUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type BudgetCreateWithoutCategoriesInput = {
    id?: string
    name: string
    description?: string | null
    amount: number
    startDate: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutBudgetsInput
    organization?: OrganizationCreateNestedOneWithoutBudgetsInput
    expenses?: ExpenseCreateNestedManyWithoutBudgetInput
    project?: ProjectCreateNestedOneWithoutBudgetsInput
  }

  export type BudgetUncheckedCreateWithoutCategoriesInput = {
    id?: string
    name: string
    description?: string | null
    amount: number
    startDate: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    organizationId?: string | null
    projectId?: string | null
    expenses?: ExpenseUncheckedCreateNestedManyWithoutBudgetInput
  }

  export type BudgetCreateOrConnectWithoutCategoriesInput = {
    where: BudgetWhereUniqueInput
    create: XOR<BudgetCreateWithoutCategoriesInput, BudgetUncheckedCreateWithoutCategoriesInput>
  }

  export type ExpenseCreateWithoutCategoryInput = {
    id?: string
    title: string
    description?: string | null
    amount: number
    date: Date | string
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutExpensesInput
    organization?: OrganizationCreateNestedOneWithoutExpensesInput
    budget?: BudgetCreateNestedOneWithoutExpensesInput
    timesheetEntry?: TimesheetEntryCreateNestedOneWithoutExpensesInput
    project?: ProjectCreateNestedOneWithoutExpensesInput
  }

  export type ExpenseUncheckedCreateWithoutCategoryInput = {
    id?: string
    title: string
    description?: string | null
    amount: number
    date: Date | string
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    organizationId?: string | null
    budgetId?: string | null
    timesheetEntryId?: string | null
    projectId?: string | null
  }

  export type ExpenseCreateOrConnectWithoutCategoryInput = {
    where: ExpenseWhereUniqueInput
    create: XOR<ExpenseCreateWithoutCategoryInput, ExpenseUncheckedCreateWithoutCategoryInput>
  }

  export type ExpenseCreateManyCategoryInputEnvelope = {
    data: ExpenseCreateManyCategoryInput | ExpenseCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type BudgetUpsertWithoutCategoriesInput = {
    update: XOR<BudgetUpdateWithoutCategoriesInput, BudgetUncheckedUpdateWithoutCategoriesInput>
    create: XOR<BudgetCreateWithoutCategoriesInput, BudgetUncheckedCreateWithoutCategoriesInput>
    where?: BudgetWhereInput
  }

  export type BudgetUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: BudgetWhereInput
    data: XOR<BudgetUpdateWithoutCategoriesInput, BudgetUncheckedUpdateWithoutCategoriesInput>
  }

  export type BudgetUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutBudgetsNestedInput
    organization?: OrganizationUpdateOneWithoutBudgetsNestedInput
    expenses?: ExpenseUpdateManyWithoutBudgetNestedInput
    project?: ProjectUpdateOneWithoutBudgetsNestedInput
  }

  export type BudgetUncheckedUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    expenses?: ExpenseUncheckedUpdateManyWithoutBudgetNestedInput
  }

  export type ExpenseUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ExpenseWhereUniqueInput
    update: XOR<ExpenseUpdateWithoutCategoryInput, ExpenseUncheckedUpdateWithoutCategoryInput>
    create: XOR<ExpenseCreateWithoutCategoryInput, ExpenseUncheckedCreateWithoutCategoryInput>
  }

  export type ExpenseUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ExpenseWhereUniqueInput
    data: XOR<ExpenseUpdateWithoutCategoryInput, ExpenseUncheckedUpdateWithoutCategoryInput>
  }

  export type ExpenseUpdateManyWithWhereWithoutCategoryInput = {
    where: ExpenseScalarWhereInput
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyWithoutCategoryInput>
  }

  export type UserCreateWithoutExpensesInput = {
    id?: string
    email: string
    username?: string | null
    passwordHash: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profileImage?: string | null
    phoneNumber?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    organization?: OrganizationCreateNestedOneWithoutMembersInput
    ownedOrganization?: OrganizationCreateNestedOneWithoutOwnerInput
    budgets?: BudgetCreateNestedManyWithoutUserInput
    timesheets?: TimesheetCreateNestedManyWithoutUserInput
    invitations?: UserInvitationCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutExpensesInput = {
    id?: string
    email: string
    username?: string | null
    passwordHash: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profileImage?: string | null
    phoneNumber?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    organizationId?: string | null
    ownedOrganization?: OrganizationUncheckedCreateNestedOneWithoutOwnerInput
    budgets?: BudgetUncheckedCreateNestedManyWithoutUserInput
    timesheets?: TimesheetUncheckedCreateNestedManyWithoutUserInput
    invitations?: UserInvitationUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutExpensesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutExpensesInput, UserUncheckedCreateWithoutExpensesInput>
  }

  export type OrganizationCreateWithoutExpensesInput = {
    id?: string
    name: string
    email?: string | null
    description?: string | null
    logo?: string | null
    website?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    owner?: UserCreateNestedOneWithoutOwnedOrganizationInput
    members?: UserCreateNestedManyWithoutOrganizationInput
    invitations?: UserInvitationCreateNestedManyWithoutOrganizationInput
    budgets?: BudgetCreateNestedManyWithoutOrganizationInput
    timesheets?: TimesheetCreateNestedManyWithoutOrganizationInput
    subscription?: SubscriptionCreateNestedOneWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutExpensesInput = {
    id?: string
    name: string
    email?: string | null
    description?: string | null
    logo?: string | null
    website?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    ownerId?: string | null
    members?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    invitations?: UserInvitationUncheckedCreateNestedManyWithoutOrganizationInput
    budgets?: BudgetUncheckedCreateNestedManyWithoutOrganizationInput
    timesheets?: TimesheetUncheckedCreateNestedManyWithoutOrganizationInput
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutExpensesInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutExpensesInput, OrganizationUncheckedCreateWithoutExpensesInput>
  }

  export type BudgetCreateWithoutExpensesInput = {
    id?: string
    name: string
    description?: string | null
    amount: number
    startDate: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutBudgetsInput
    organization?: OrganizationCreateNestedOneWithoutBudgetsInput
    categories?: BudgetCategoryCreateNestedManyWithoutBudgetInput
    project?: ProjectCreateNestedOneWithoutBudgetsInput
  }

  export type BudgetUncheckedCreateWithoutExpensesInput = {
    id?: string
    name: string
    description?: string | null
    amount: number
    startDate: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    organizationId?: string | null
    projectId?: string | null
    categories?: BudgetCategoryUncheckedCreateNestedManyWithoutBudgetInput
  }

  export type BudgetCreateOrConnectWithoutExpensesInput = {
    where: BudgetWhereUniqueInput
    create: XOR<BudgetCreateWithoutExpensesInput, BudgetUncheckedCreateWithoutExpensesInput>
  }

  export type BudgetCategoryCreateWithoutExpensesInput = {
    id?: string
    name: string
    description?: string | null
    allocatedAmount: number
    createdAt?: Date | string
    updatedAt?: Date | string
    budget: BudgetCreateNestedOneWithoutCategoriesInput
  }

  export type BudgetCategoryUncheckedCreateWithoutExpensesInput = {
    id?: string
    name: string
    description?: string | null
    allocatedAmount: number
    createdAt?: Date | string
    updatedAt?: Date | string
    budgetId: string
  }

  export type BudgetCategoryCreateOrConnectWithoutExpensesInput = {
    where: BudgetCategoryWhereUniqueInput
    create: XOR<BudgetCategoryCreateWithoutExpensesInput, BudgetCategoryUncheckedCreateWithoutExpensesInput>
  }

  export type TimesheetEntryCreateWithoutExpensesInput = {
    id?: string
    description: string
    startTime: Date | string
    endTime: Date | string
    duration: number
    createdAt?: Date | string
    updatedAt?: Date | string
    timesheet: TimesheetCreateNestedOneWithoutEntriesInput
  }

  export type TimesheetEntryUncheckedCreateWithoutExpensesInput = {
    id?: string
    description: string
    startTime: Date | string
    endTime: Date | string
    duration: number
    createdAt?: Date | string
    updatedAt?: Date | string
    timesheetId: string
  }

  export type TimesheetEntryCreateOrConnectWithoutExpensesInput = {
    where: TimesheetEntryWhereUniqueInput
    create: XOR<TimesheetEntryCreateWithoutExpensesInput, TimesheetEntryUncheckedCreateWithoutExpensesInput>
  }

  export type ProjectCreateWithoutExpensesInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    budgets?: BudgetCreateNestedManyWithoutProjectInput
    timesheets?: TimesheetCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutExpensesInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    budgets?: BudgetUncheckedCreateNestedManyWithoutProjectInput
    timesheets?: TimesheetUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutExpensesInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutExpensesInput, ProjectUncheckedCreateWithoutExpensesInput>
  }

  export type UserUpsertWithoutExpensesInput = {
    update: XOR<UserUpdateWithoutExpensesInput, UserUncheckedUpdateWithoutExpensesInput>
    create: XOR<UserCreateWithoutExpensesInput, UserUncheckedCreateWithoutExpensesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutExpensesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutExpensesInput, UserUncheckedUpdateWithoutExpensesInput>
  }

  export type UserUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organization?: OrganizationUpdateOneWithoutMembersNestedInput
    ownedOrganization?: OrganizationUpdateOneWithoutOwnerNestedInput
    budgets?: BudgetUpdateManyWithoutUserNestedInput
    timesheets?: TimesheetUpdateManyWithoutUserNestedInput
    invitations?: UserInvitationUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    ownedOrganization?: OrganizationUncheckedUpdateOneWithoutOwnerNestedInput
    budgets?: BudgetUncheckedUpdateManyWithoutUserNestedInput
    timesheets?: TimesheetUncheckedUpdateManyWithoutUserNestedInput
    invitations?: UserInvitationUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OrganizationUpsertWithoutExpensesInput = {
    update: XOR<OrganizationUpdateWithoutExpensesInput, OrganizationUncheckedUpdateWithoutExpensesInput>
    create: XOR<OrganizationCreateWithoutExpensesInput, OrganizationUncheckedCreateWithoutExpensesInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutExpensesInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutExpensesInput, OrganizationUncheckedUpdateWithoutExpensesInput>
  }

  export type OrganizationUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    owner?: UserUpdateOneWithoutOwnedOrganizationNestedInput
    members?: UserUpdateManyWithoutOrganizationNestedInput
    invitations?: UserInvitationUpdateManyWithoutOrganizationNestedInput
    budgets?: BudgetUpdateManyWithoutOrganizationNestedInput
    timesheets?: TimesheetUpdateManyWithoutOrganizationNestedInput
    subscription?: SubscriptionUpdateOneWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    members?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    invitations?: UserInvitationUncheckedUpdateManyWithoutOrganizationNestedInput
    budgets?: BudgetUncheckedUpdateManyWithoutOrganizationNestedInput
    timesheets?: TimesheetUncheckedUpdateManyWithoutOrganizationNestedInput
    subscription?: SubscriptionUncheckedUpdateOneWithoutOrganizationNestedInput
  }

  export type BudgetUpsertWithoutExpensesInput = {
    update: XOR<BudgetUpdateWithoutExpensesInput, BudgetUncheckedUpdateWithoutExpensesInput>
    create: XOR<BudgetCreateWithoutExpensesInput, BudgetUncheckedCreateWithoutExpensesInput>
    where?: BudgetWhereInput
  }

  export type BudgetUpdateToOneWithWhereWithoutExpensesInput = {
    where?: BudgetWhereInput
    data: XOR<BudgetUpdateWithoutExpensesInput, BudgetUncheckedUpdateWithoutExpensesInput>
  }

  export type BudgetUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutBudgetsNestedInput
    organization?: OrganizationUpdateOneWithoutBudgetsNestedInput
    categories?: BudgetCategoryUpdateManyWithoutBudgetNestedInput
    project?: ProjectUpdateOneWithoutBudgetsNestedInput
  }

  export type BudgetUncheckedUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    categories?: BudgetCategoryUncheckedUpdateManyWithoutBudgetNestedInput
  }

  export type BudgetCategoryUpsertWithoutExpensesInput = {
    update: XOR<BudgetCategoryUpdateWithoutExpensesInput, BudgetCategoryUncheckedUpdateWithoutExpensesInput>
    create: XOR<BudgetCategoryCreateWithoutExpensesInput, BudgetCategoryUncheckedCreateWithoutExpensesInput>
    where?: BudgetCategoryWhereInput
  }

  export type BudgetCategoryUpdateToOneWithWhereWithoutExpensesInput = {
    where?: BudgetCategoryWhereInput
    data: XOR<BudgetCategoryUpdateWithoutExpensesInput, BudgetCategoryUncheckedUpdateWithoutExpensesInput>
  }

  export type BudgetCategoryUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    allocatedAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budget?: BudgetUpdateOneRequiredWithoutCategoriesNestedInput
  }

  export type BudgetCategoryUncheckedUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    allocatedAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgetId?: StringFieldUpdateOperationsInput | string
  }

  export type TimesheetEntryUpsertWithoutExpensesInput = {
    update: XOR<TimesheetEntryUpdateWithoutExpensesInput, TimesheetEntryUncheckedUpdateWithoutExpensesInput>
    create: XOR<TimesheetEntryCreateWithoutExpensesInput, TimesheetEntryUncheckedCreateWithoutExpensesInput>
    where?: TimesheetEntryWhereInput
  }

  export type TimesheetEntryUpdateToOneWithWhereWithoutExpensesInput = {
    where?: TimesheetEntryWhereInput
    data: XOR<TimesheetEntryUpdateWithoutExpensesInput, TimesheetEntryUncheckedUpdateWithoutExpensesInput>
  }

  export type TimesheetEntryUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timesheet?: TimesheetUpdateOneRequiredWithoutEntriesNestedInput
  }

  export type TimesheetEntryUncheckedUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timesheetId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectUpsertWithoutExpensesInput = {
    update: XOR<ProjectUpdateWithoutExpensesInput, ProjectUncheckedUpdateWithoutExpensesInput>
    create: XOR<ProjectCreateWithoutExpensesInput, ProjectUncheckedCreateWithoutExpensesInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutExpensesInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutExpensesInput, ProjectUncheckedUpdateWithoutExpensesInput>
  }

  export type ProjectUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgets?: BudgetUpdateManyWithoutProjectNestedInput
    timesheets?: TimesheetUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgets?: BudgetUncheckedUpdateManyWithoutProjectNestedInput
    timesheets?: TimesheetUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type UserCreateWithoutTimesheetsInput = {
    id?: string
    email: string
    username?: string | null
    passwordHash: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profileImage?: string | null
    phoneNumber?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    organization?: OrganizationCreateNestedOneWithoutMembersInput
    ownedOrganization?: OrganizationCreateNestedOneWithoutOwnerInput
    budgets?: BudgetCreateNestedManyWithoutUserInput
    expenses?: ExpenseCreateNestedManyWithoutUserInput
    invitations?: UserInvitationCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTimesheetsInput = {
    id?: string
    email: string
    username?: string | null
    passwordHash: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profileImage?: string | null
    phoneNumber?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    organizationId?: string | null
    ownedOrganization?: OrganizationUncheckedCreateNestedOneWithoutOwnerInput
    budgets?: BudgetUncheckedCreateNestedManyWithoutUserInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutUserInput
    invitations?: UserInvitationUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTimesheetsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTimesheetsInput, UserUncheckedCreateWithoutTimesheetsInput>
  }

  export type OrganizationCreateWithoutTimesheetsInput = {
    id?: string
    name: string
    email?: string | null
    description?: string | null
    logo?: string | null
    website?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    owner?: UserCreateNestedOneWithoutOwnedOrganizationInput
    members?: UserCreateNestedManyWithoutOrganizationInput
    invitations?: UserInvitationCreateNestedManyWithoutOrganizationInput
    budgets?: BudgetCreateNestedManyWithoutOrganizationInput
    expenses?: ExpenseCreateNestedManyWithoutOrganizationInput
    subscription?: SubscriptionCreateNestedOneWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutTimesheetsInput = {
    id?: string
    name: string
    email?: string | null
    description?: string | null
    logo?: string | null
    website?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    ownerId?: string | null
    members?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    invitations?: UserInvitationUncheckedCreateNestedManyWithoutOrganizationInput
    budgets?: BudgetUncheckedCreateNestedManyWithoutOrganizationInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutOrganizationInput
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutTimesheetsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutTimesheetsInput, OrganizationUncheckedCreateWithoutTimesheetsInput>
  }

  export type TimesheetEntryCreateWithoutTimesheetInput = {
    id?: string
    description: string
    startTime: Date | string
    endTime: Date | string
    duration: number
    createdAt?: Date | string
    updatedAt?: Date | string
    expenses?: ExpenseCreateNestedManyWithoutTimesheetEntryInput
  }

  export type TimesheetEntryUncheckedCreateWithoutTimesheetInput = {
    id?: string
    description: string
    startTime: Date | string
    endTime: Date | string
    duration: number
    createdAt?: Date | string
    updatedAt?: Date | string
    expenses?: ExpenseUncheckedCreateNestedManyWithoutTimesheetEntryInput
  }

  export type TimesheetEntryCreateOrConnectWithoutTimesheetInput = {
    where: TimesheetEntryWhereUniqueInput
    create: XOR<TimesheetEntryCreateWithoutTimesheetInput, TimesheetEntryUncheckedCreateWithoutTimesheetInput>
  }

  export type TimesheetEntryCreateManyTimesheetInputEnvelope = {
    data: TimesheetEntryCreateManyTimesheetInput | TimesheetEntryCreateManyTimesheetInput[]
    skipDuplicates?: boolean
  }

  export type ProjectCreateWithoutTimesheetsInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    budgets?: BudgetCreateNestedManyWithoutProjectInput
    expenses?: ExpenseCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutTimesheetsInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    budgets?: BudgetUncheckedCreateNestedManyWithoutProjectInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutTimesheetsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutTimesheetsInput, ProjectUncheckedCreateWithoutTimesheetsInput>
  }

  export type UserUpsertWithoutTimesheetsInput = {
    update: XOR<UserUpdateWithoutTimesheetsInput, UserUncheckedUpdateWithoutTimesheetsInput>
    create: XOR<UserCreateWithoutTimesheetsInput, UserUncheckedCreateWithoutTimesheetsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTimesheetsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTimesheetsInput, UserUncheckedUpdateWithoutTimesheetsInput>
  }

  export type UserUpdateWithoutTimesheetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organization?: OrganizationUpdateOneWithoutMembersNestedInput
    ownedOrganization?: OrganizationUpdateOneWithoutOwnerNestedInput
    budgets?: BudgetUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUpdateManyWithoutUserNestedInput
    invitations?: UserInvitationUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTimesheetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    ownedOrganization?: OrganizationUncheckedUpdateOneWithoutOwnerNestedInput
    budgets?: BudgetUncheckedUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutUserNestedInput
    invitations?: UserInvitationUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OrganizationUpsertWithoutTimesheetsInput = {
    update: XOR<OrganizationUpdateWithoutTimesheetsInput, OrganizationUncheckedUpdateWithoutTimesheetsInput>
    create: XOR<OrganizationCreateWithoutTimesheetsInput, OrganizationUncheckedCreateWithoutTimesheetsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutTimesheetsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutTimesheetsInput, OrganizationUncheckedUpdateWithoutTimesheetsInput>
  }

  export type OrganizationUpdateWithoutTimesheetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    owner?: UserUpdateOneWithoutOwnedOrganizationNestedInput
    members?: UserUpdateManyWithoutOrganizationNestedInput
    invitations?: UserInvitationUpdateManyWithoutOrganizationNestedInput
    budgets?: BudgetUpdateManyWithoutOrganizationNestedInput
    expenses?: ExpenseUpdateManyWithoutOrganizationNestedInput
    subscription?: SubscriptionUpdateOneWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutTimesheetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    members?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    invitations?: UserInvitationUncheckedUpdateManyWithoutOrganizationNestedInput
    budgets?: BudgetUncheckedUpdateManyWithoutOrganizationNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutOrganizationNestedInput
    subscription?: SubscriptionUncheckedUpdateOneWithoutOrganizationNestedInput
  }

  export type TimesheetEntryUpsertWithWhereUniqueWithoutTimesheetInput = {
    where: TimesheetEntryWhereUniqueInput
    update: XOR<TimesheetEntryUpdateWithoutTimesheetInput, TimesheetEntryUncheckedUpdateWithoutTimesheetInput>
    create: XOR<TimesheetEntryCreateWithoutTimesheetInput, TimesheetEntryUncheckedCreateWithoutTimesheetInput>
  }

  export type TimesheetEntryUpdateWithWhereUniqueWithoutTimesheetInput = {
    where: TimesheetEntryWhereUniqueInput
    data: XOR<TimesheetEntryUpdateWithoutTimesheetInput, TimesheetEntryUncheckedUpdateWithoutTimesheetInput>
  }

  export type TimesheetEntryUpdateManyWithWhereWithoutTimesheetInput = {
    where: TimesheetEntryScalarWhereInput
    data: XOR<TimesheetEntryUpdateManyMutationInput, TimesheetEntryUncheckedUpdateManyWithoutTimesheetInput>
  }

  export type TimesheetEntryScalarWhereInput = {
    AND?: TimesheetEntryScalarWhereInput | TimesheetEntryScalarWhereInput[]
    OR?: TimesheetEntryScalarWhereInput[]
    NOT?: TimesheetEntryScalarWhereInput | TimesheetEntryScalarWhereInput[]
    id?: StringFilter<"TimesheetEntry"> | string
    description?: StringFilter<"TimesheetEntry"> | string
    startTime?: DateTimeFilter<"TimesheetEntry"> | Date | string
    endTime?: DateTimeFilter<"TimesheetEntry"> | Date | string
    duration?: FloatFilter<"TimesheetEntry"> | number
    createdAt?: DateTimeFilter<"TimesheetEntry"> | Date | string
    updatedAt?: DateTimeFilter<"TimesheetEntry"> | Date | string
    timesheetId?: StringFilter<"TimesheetEntry"> | string
  }

  export type ProjectUpsertWithoutTimesheetsInput = {
    update: XOR<ProjectUpdateWithoutTimesheetsInput, ProjectUncheckedUpdateWithoutTimesheetsInput>
    create: XOR<ProjectCreateWithoutTimesheetsInput, ProjectUncheckedCreateWithoutTimesheetsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutTimesheetsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutTimesheetsInput, ProjectUncheckedUpdateWithoutTimesheetsInput>
  }

  export type ProjectUpdateWithoutTimesheetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgets?: BudgetUpdateManyWithoutProjectNestedInput
    expenses?: ExpenseUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutTimesheetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgets?: BudgetUncheckedUpdateManyWithoutProjectNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type TimesheetCreateWithoutEntriesInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutTimesheetsInput
    organization?: OrganizationCreateNestedOneWithoutTimesheetsInput
    project?: ProjectCreateNestedOneWithoutTimesheetsInput
  }

  export type TimesheetUncheckedCreateWithoutEntriesInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    organizationId?: string | null
    projectId?: string | null
  }

  export type TimesheetCreateOrConnectWithoutEntriesInput = {
    where: TimesheetWhereUniqueInput
    create: XOR<TimesheetCreateWithoutEntriesInput, TimesheetUncheckedCreateWithoutEntriesInput>
  }

  export type ExpenseCreateWithoutTimesheetEntryInput = {
    id?: string
    title: string
    description?: string | null
    amount: number
    date: Date | string
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutExpensesInput
    organization?: OrganizationCreateNestedOneWithoutExpensesInput
    budget?: BudgetCreateNestedOneWithoutExpensesInput
    category?: BudgetCategoryCreateNestedOneWithoutExpensesInput
    project?: ProjectCreateNestedOneWithoutExpensesInput
  }

  export type ExpenseUncheckedCreateWithoutTimesheetEntryInput = {
    id?: string
    title: string
    description?: string | null
    amount: number
    date: Date | string
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    organizationId?: string | null
    budgetId?: string | null
    categoryId?: string | null
    projectId?: string | null
  }

  export type ExpenseCreateOrConnectWithoutTimesheetEntryInput = {
    where: ExpenseWhereUniqueInput
    create: XOR<ExpenseCreateWithoutTimesheetEntryInput, ExpenseUncheckedCreateWithoutTimesheetEntryInput>
  }

  export type ExpenseCreateManyTimesheetEntryInputEnvelope = {
    data: ExpenseCreateManyTimesheetEntryInput | ExpenseCreateManyTimesheetEntryInput[]
    skipDuplicates?: boolean
  }

  export type TimesheetUpsertWithoutEntriesInput = {
    update: XOR<TimesheetUpdateWithoutEntriesInput, TimesheetUncheckedUpdateWithoutEntriesInput>
    create: XOR<TimesheetCreateWithoutEntriesInput, TimesheetUncheckedCreateWithoutEntriesInput>
    where?: TimesheetWhereInput
  }

  export type TimesheetUpdateToOneWithWhereWithoutEntriesInput = {
    where?: TimesheetWhereInput
    data: XOR<TimesheetUpdateWithoutEntriesInput, TimesheetUncheckedUpdateWithoutEntriesInput>
  }

  export type TimesheetUpdateWithoutEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutTimesheetsNestedInput
    organization?: OrganizationUpdateOneWithoutTimesheetsNestedInput
    project?: ProjectUpdateOneWithoutTimesheetsNestedInput
  }

  export type TimesheetUncheckedUpdateWithoutEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExpenseUpsertWithWhereUniqueWithoutTimesheetEntryInput = {
    where: ExpenseWhereUniqueInput
    update: XOR<ExpenseUpdateWithoutTimesheetEntryInput, ExpenseUncheckedUpdateWithoutTimesheetEntryInput>
    create: XOR<ExpenseCreateWithoutTimesheetEntryInput, ExpenseUncheckedCreateWithoutTimesheetEntryInput>
  }

  export type ExpenseUpdateWithWhereUniqueWithoutTimesheetEntryInput = {
    where: ExpenseWhereUniqueInput
    data: XOR<ExpenseUpdateWithoutTimesheetEntryInput, ExpenseUncheckedUpdateWithoutTimesheetEntryInput>
  }

  export type ExpenseUpdateManyWithWhereWithoutTimesheetEntryInput = {
    where: ExpenseScalarWhereInput
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyWithoutTimesheetEntryInput>
  }

  export type BudgetCreateWithoutProjectInput = {
    id?: string
    name: string
    description?: string | null
    amount: number
    startDate: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutBudgetsInput
    organization?: OrganizationCreateNestedOneWithoutBudgetsInput
    categories?: BudgetCategoryCreateNestedManyWithoutBudgetInput
    expenses?: ExpenseCreateNestedManyWithoutBudgetInput
  }

  export type BudgetUncheckedCreateWithoutProjectInput = {
    id?: string
    name: string
    description?: string | null
    amount: number
    startDate: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    organizationId?: string | null
    categories?: BudgetCategoryUncheckedCreateNestedManyWithoutBudgetInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutBudgetInput
  }

  export type BudgetCreateOrConnectWithoutProjectInput = {
    where: BudgetWhereUniqueInput
    create: XOR<BudgetCreateWithoutProjectInput, BudgetUncheckedCreateWithoutProjectInput>
  }

  export type BudgetCreateManyProjectInputEnvelope = {
    data: BudgetCreateManyProjectInput | BudgetCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type ExpenseCreateWithoutProjectInput = {
    id?: string
    title: string
    description?: string | null
    amount: number
    date: Date | string
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutExpensesInput
    organization?: OrganizationCreateNestedOneWithoutExpensesInput
    budget?: BudgetCreateNestedOneWithoutExpensesInput
    category?: BudgetCategoryCreateNestedOneWithoutExpensesInput
    timesheetEntry?: TimesheetEntryCreateNestedOneWithoutExpensesInput
  }

  export type ExpenseUncheckedCreateWithoutProjectInput = {
    id?: string
    title: string
    description?: string | null
    amount: number
    date: Date | string
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    organizationId?: string | null
    budgetId?: string | null
    categoryId?: string | null
    timesheetEntryId?: string | null
  }

  export type ExpenseCreateOrConnectWithoutProjectInput = {
    where: ExpenseWhereUniqueInput
    create: XOR<ExpenseCreateWithoutProjectInput, ExpenseUncheckedCreateWithoutProjectInput>
  }

  export type ExpenseCreateManyProjectInputEnvelope = {
    data: ExpenseCreateManyProjectInput | ExpenseCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type TimesheetCreateWithoutProjectInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutTimesheetsInput
    organization?: OrganizationCreateNestedOneWithoutTimesheetsInput
    entries?: TimesheetEntryCreateNestedManyWithoutTimesheetInput
  }

  export type TimesheetUncheckedCreateWithoutProjectInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    organizationId?: string | null
    entries?: TimesheetEntryUncheckedCreateNestedManyWithoutTimesheetInput
  }

  export type TimesheetCreateOrConnectWithoutProjectInput = {
    where: TimesheetWhereUniqueInput
    create: XOR<TimesheetCreateWithoutProjectInput, TimesheetUncheckedCreateWithoutProjectInput>
  }

  export type TimesheetCreateManyProjectInputEnvelope = {
    data: TimesheetCreateManyProjectInput | TimesheetCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type BudgetUpsertWithWhereUniqueWithoutProjectInput = {
    where: BudgetWhereUniqueInput
    update: XOR<BudgetUpdateWithoutProjectInput, BudgetUncheckedUpdateWithoutProjectInput>
    create: XOR<BudgetCreateWithoutProjectInput, BudgetUncheckedCreateWithoutProjectInput>
  }

  export type BudgetUpdateWithWhereUniqueWithoutProjectInput = {
    where: BudgetWhereUniqueInput
    data: XOR<BudgetUpdateWithoutProjectInput, BudgetUncheckedUpdateWithoutProjectInput>
  }

  export type BudgetUpdateManyWithWhereWithoutProjectInput = {
    where: BudgetScalarWhereInput
    data: XOR<BudgetUpdateManyMutationInput, BudgetUncheckedUpdateManyWithoutProjectInput>
  }

  export type ExpenseUpsertWithWhereUniqueWithoutProjectInput = {
    where: ExpenseWhereUniqueInput
    update: XOR<ExpenseUpdateWithoutProjectInput, ExpenseUncheckedUpdateWithoutProjectInput>
    create: XOR<ExpenseCreateWithoutProjectInput, ExpenseUncheckedCreateWithoutProjectInput>
  }

  export type ExpenseUpdateWithWhereUniqueWithoutProjectInput = {
    where: ExpenseWhereUniqueInput
    data: XOR<ExpenseUpdateWithoutProjectInput, ExpenseUncheckedUpdateWithoutProjectInput>
  }

  export type ExpenseUpdateManyWithWhereWithoutProjectInput = {
    where: ExpenseScalarWhereInput
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyWithoutProjectInput>
  }

  export type TimesheetUpsertWithWhereUniqueWithoutProjectInput = {
    where: TimesheetWhereUniqueInput
    update: XOR<TimesheetUpdateWithoutProjectInput, TimesheetUncheckedUpdateWithoutProjectInput>
    create: XOR<TimesheetCreateWithoutProjectInput, TimesheetUncheckedCreateWithoutProjectInput>
  }

  export type TimesheetUpdateWithWhereUniqueWithoutProjectInput = {
    where: TimesheetWhereUniqueInput
    data: XOR<TimesheetUpdateWithoutProjectInput, TimesheetUncheckedUpdateWithoutProjectInput>
  }

  export type TimesheetUpdateManyWithWhereWithoutProjectInput = {
    where: TimesheetScalarWhereInput
    data: XOR<TimesheetUpdateManyMutationInput, TimesheetUncheckedUpdateManyWithoutProjectInput>
  }

  export type OrganizationCreateWithoutSubscriptionInput = {
    id?: string
    name: string
    email?: string | null
    description?: string | null
    logo?: string | null
    website?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    owner?: UserCreateNestedOneWithoutOwnedOrganizationInput
    members?: UserCreateNestedManyWithoutOrganizationInput
    invitations?: UserInvitationCreateNestedManyWithoutOrganizationInput
    budgets?: BudgetCreateNestedManyWithoutOrganizationInput
    expenses?: ExpenseCreateNestedManyWithoutOrganizationInput
    timesheets?: TimesheetCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutSubscriptionInput = {
    id?: string
    name: string
    email?: string | null
    description?: string | null
    logo?: string | null
    website?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    ownerId?: string | null
    members?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    invitations?: UserInvitationUncheckedCreateNestedManyWithoutOrganizationInput
    budgets?: BudgetUncheckedCreateNestedManyWithoutOrganizationInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutOrganizationInput
    timesheets?: TimesheetUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutSubscriptionInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutSubscriptionInput, OrganizationUncheckedCreateWithoutSubscriptionInput>
  }

  export type OrganizationUpsertWithoutSubscriptionInput = {
    update: XOR<OrganizationUpdateWithoutSubscriptionInput, OrganizationUncheckedUpdateWithoutSubscriptionInput>
    create: XOR<OrganizationCreateWithoutSubscriptionInput, OrganizationUncheckedCreateWithoutSubscriptionInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutSubscriptionInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutSubscriptionInput, OrganizationUncheckedUpdateWithoutSubscriptionInput>
  }

  export type OrganizationUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    owner?: UserUpdateOneWithoutOwnedOrganizationNestedInput
    members?: UserUpdateManyWithoutOrganizationNestedInput
    invitations?: UserInvitationUpdateManyWithoutOrganizationNestedInput
    budgets?: BudgetUpdateManyWithoutOrganizationNestedInput
    expenses?: ExpenseUpdateManyWithoutOrganizationNestedInput
    timesheets?: TimesheetUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    members?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    invitations?: UserInvitationUncheckedUpdateManyWithoutOrganizationNestedInput
    budgets?: BudgetUncheckedUpdateManyWithoutOrganizationNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutOrganizationNestedInput
    timesheets?: TimesheetUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type UserCreateWithoutNotificationsInput = {
    id?: string
    email: string
    username?: string | null
    passwordHash: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profileImage?: string | null
    phoneNumber?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    organization?: OrganizationCreateNestedOneWithoutMembersInput
    ownedOrganization?: OrganizationCreateNestedOneWithoutOwnerInput
    budgets?: BudgetCreateNestedManyWithoutUserInput
    expenses?: ExpenseCreateNestedManyWithoutUserInput
    timesheets?: TimesheetCreateNestedManyWithoutUserInput
    invitations?: UserInvitationCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string
    email: string
    username?: string | null
    passwordHash: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profileImage?: string | null
    phoneNumber?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    organizationId?: string | null
    ownedOrganization?: OrganizationUncheckedCreateNestedOneWithoutOwnerInput
    budgets?: BudgetUncheckedCreateNestedManyWithoutUserInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutUserInput
    timesheets?: TimesheetUncheckedCreateNestedManyWithoutUserInput
    invitations?: UserInvitationUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organization?: OrganizationUpdateOneWithoutMembersNestedInput
    ownedOrganization?: OrganizationUpdateOneWithoutOwnerNestedInput
    budgets?: BudgetUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUpdateManyWithoutUserNestedInput
    timesheets?: TimesheetUpdateManyWithoutUserNestedInput
    invitations?: UserInvitationUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    ownedOrganization?: OrganizationUncheckedUpdateOneWithoutOwnerNestedInput
    budgets?: BudgetUncheckedUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutUserNestedInput
    timesheets?: TimesheetUncheckedUpdateManyWithoutUserNestedInput
    invitations?: UserInvitationUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    username?: string | null
    passwordHash: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profileImage?: string | null
    phoneNumber?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    organization?: OrganizationCreateNestedOneWithoutMembersInput
    ownedOrganization?: OrganizationCreateNestedOneWithoutOwnerInput
    budgets?: BudgetCreateNestedManyWithoutUserInput
    expenses?: ExpenseCreateNestedManyWithoutUserInput
    timesheets?: TimesheetCreateNestedManyWithoutUserInput
    invitations?: UserInvitationCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    username?: string | null
    passwordHash: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profileImage?: string | null
    phoneNumber?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    organizationId?: string | null
    ownedOrganization?: OrganizationUncheckedCreateNestedOneWithoutOwnerInput
    budgets?: BudgetUncheckedCreateNestedManyWithoutUserInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutUserInput
    timesheets?: TimesheetUncheckedCreateNestedManyWithoutUserInput
    invitations?: UserInvitationUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organization?: OrganizationUpdateOneWithoutMembersNestedInput
    ownedOrganization?: OrganizationUpdateOneWithoutOwnerNestedInput
    budgets?: BudgetUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUpdateManyWithoutUserNestedInput
    timesheets?: TimesheetUpdateManyWithoutUserNestedInput
    invitations?: UserInvitationUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    ownedOrganization?: OrganizationUncheckedUpdateOneWithoutOwnerNestedInput
    budgets?: BudgetUncheckedUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutUserNestedInput
    timesheets?: TimesheetUncheckedUpdateManyWithoutUserNestedInput
    invitations?: UserInvitationUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BudgetCreateManyUserInput = {
    id?: string
    name: string
    description?: string | null
    amount: number
    startDate: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizationId?: string | null
    projectId?: string | null
  }

  export type ExpenseCreateManyUserInput = {
    id?: string
    title: string
    description?: string | null
    amount: number
    date: Date | string
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizationId?: string | null
    budgetId?: string | null
    categoryId?: string | null
    timesheetEntryId?: string | null
    projectId?: string | null
  }

  export type TimesheetCreateManyUserInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    organizationId?: string | null
    projectId?: string | null
  }

  export type UserInvitationCreateManyUserInput = {
    id?: string
    email: string
    token: string
    status?: $Enums.InvitationStatus
    role?: $Enums.UserRole
    expiresAt: Date | string
    createdAt?: Date | string
    organizationId: string
  }

  export type NotificationCreateManyUserInput = {
    id?: string
    title: string
    message: string
    isRead?: boolean
    type: string
    createdAt?: Date | string
  }

  export type AuditLogCreateManyUserInput = {
    id?: string
    action: string
    entity: string
    entityId: string
    details?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type BudgetUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneWithoutBudgetsNestedInput
    categories?: BudgetCategoryUpdateManyWithoutBudgetNestedInput
    expenses?: ExpenseUpdateManyWithoutBudgetNestedInput
    project?: ProjectUpdateOneWithoutBudgetsNestedInput
  }

  export type BudgetUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    categories?: BudgetCategoryUncheckedUpdateManyWithoutBudgetNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutBudgetNestedInput
  }

  export type BudgetUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExpenseUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneWithoutExpensesNestedInput
    budget?: BudgetUpdateOneWithoutExpensesNestedInput
    category?: BudgetCategoryUpdateOneWithoutExpensesNestedInput
    timesheetEntry?: TimesheetEntryUpdateOneWithoutExpensesNestedInput
    project?: ProjectUpdateOneWithoutExpensesNestedInput
  }

  export type ExpenseUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    timesheetEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExpenseUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    timesheetEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TimesheetUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneWithoutTimesheetsNestedInput
    entries?: TimesheetEntryUpdateManyWithoutTimesheetNestedInput
    project?: ProjectUpdateOneWithoutTimesheetsNestedInput
  }

  export type TimesheetUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    entries?: TimesheetEntryUncheckedUpdateManyWithoutTimesheetNestedInput
  }

  export type TimesheetUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserInvitationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutInvitationsNestedInput
  }

  export type UserInvitationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type UserInvitationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type NotificationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyOrganizationInput = {
    id?: string
    email: string
    username?: string | null
    passwordHash: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profileImage?: string | null
    phoneNumber?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
  }

  export type UserInvitationCreateManyOrganizationInput = {
    id?: string
    email: string
    token: string
    status?: $Enums.InvitationStatus
    role?: $Enums.UserRole
    expiresAt: Date | string
    createdAt?: Date | string
    userId?: string | null
  }

  export type BudgetCreateManyOrganizationInput = {
    id?: string
    name: string
    description?: string | null
    amount: number
    startDate: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    projectId?: string | null
  }

  export type ExpenseCreateManyOrganizationInput = {
    id?: string
    title: string
    description?: string | null
    amount: number
    date: Date | string
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    budgetId?: string | null
    categoryId?: string | null
    timesheetEntryId?: string | null
    projectId?: string | null
  }

  export type TimesheetCreateManyOrganizationInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    projectId?: string | null
  }

  export type UserUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownedOrganization?: OrganizationUpdateOneWithoutOwnerNestedInput
    budgets?: BudgetUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUpdateManyWithoutUserNestedInput
    timesheets?: TimesheetUpdateManyWithoutUserNestedInput
    invitations?: UserInvitationUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownedOrganization?: OrganizationUncheckedUpdateOneWithoutOwnerNestedInput
    budgets?: BudgetUncheckedUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutUserNestedInput
    timesheets?: TimesheetUncheckedUpdateManyWithoutUserNestedInput
    invitations?: UserInvitationUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserInvitationUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutInvitationsNestedInput
  }

  export type UserInvitationUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserInvitationUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BudgetUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutBudgetsNestedInput
    categories?: BudgetCategoryUpdateManyWithoutBudgetNestedInput
    expenses?: ExpenseUpdateManyWithoutBudgetNestedInput
    project?: ProjectUpdateOneWithoutBudgetsNestedInput
  }

  export type BudgetUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    categories?: BudgetCategoryUncheckedUpdateManyWithoutBudgetNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutBudgetNestedInput
  }

  export type BudgetUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExpenseUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutExpensesNestedInput
    budget?: BudgetUpdateOneWithoutExpensesNestedInput
    category?: BudgetCategoryUpdateOneWithoutExpensesNestedInput
    timesheetEntry?: TimesheetEntryUpdateOneWithoutExpensesNestedInput
    project?: ProjectUpdateOneWithoutExpensesNestedInput
  }

  export type ExpenseUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    timesheetEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExpenseUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    timesheetEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TimesheetUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutTimesheetsNestedInput
    entries?: TimesheetEntryUpdateManyWithoutTimesheetNestedInput
    project?: ProjectUpdateOneWithoutTimesheetsNestedInput
  }

  export type TimesheetUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    entries?: TimesheetEntryUncheckedUpdateManyWithoutTimesheetNestedInput
  }

  export type TimesheetUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BudgetCategoryCreateManyBudgetInput = {
    id?: string
    name: string
    description?: string | null
    allocatedAmount: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExpenseCreateManyBudgetInput = {
    id?: string
    title: string
    description?: string | null
    amount: number
    date: Date | string
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    organizationId?: string | null
    categoryId?: string | null
    timesheetEntryId?: string | null
    projectId?: string | null
  }

  export type BudgetCategoryUpdateWithoutBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    allocatedAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expenses?: ExpenseUpdateManyWithoutCategoryNestedInput
  }

  export type BudgetCategoryUncheckedUpdateWithoutBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    allocatedAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expenses?: ExpenseUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type BudgetCategoryUncheckedUpdateManyWithoutBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    allocatedAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseUpdateWithoutBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutExpensesNestedInput
    organization?: OrganizationUpdateOneWithoutExpensesNestedInput
    category?: BudgetCategoryUpdateOneWithoutExpensesNestedInput
    timesheetEntry?: TimesheetEntryUpdateOneWithoutExpensesNestedInput
    project?: ProjectUpdateOneWithoutExpensesNestedInput
  }

  export type ExpenseUncheckedUpdateWithoutBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    timesheetEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExpenseUncheckedUpdateManyWithoutBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    timesheetEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExpenseCreateManyCategoryInput = {
    id?: string
    title: string
    description?: string | null
    amount: number
    date: Date | string
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    organizationId?: string | null
    budgetId?: string | null
    timesheetEntryId?: string | null
    projectId?: string | null
  }

  export type ExpenseUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutExpensesNestedInput
    organization?: OrganizationUpdateOneWithoutExpensesNestedInput
    budget?: BudgetUpdateOneWithoutExpensesNestedInput
    timesheetEntry?: TimesheetEntryUpdateOneWithoutExpensesNestedInput
    project?: ProjectUpdateOneWithoutExpensesNestedInput
  }

  export type ExpenseUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetId?: NullableStringFieldUpdateOperationsInput | string | null
    timesheetEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExpenseUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetId?: NullableStringFieldUpdateOperationsInput | string | null
    timesheetEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TimesheetEntryCreateManyTimesheetInput = {
    id?: string
    description: string
    startTime: Date | string
    endTime: Date | string
    duration: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TimesheetEntryUpdateWithoutTimesheetInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expenses?: ExpenseUpdateManyWithoutTimesheetEntryNestedInput
  }

  export type TimesheetEntryUncheckedUpdateWithoutTimesheetInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expenses?: ExpenseUncheckedUpdateManyWithoutTimesheetEntryNestedInput
  }

  export type TimesheetEntryUncheckedUpdateManyWithoutTimesheetInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseCreateManyTimesheetEntryInput = {
    id?: string
    title: string
    description?: string | null
    amount: number
    date: Date | string
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    organizationId?: string | null
    budgetId?: string | null
    categoryId?: string | null
    projectId?: string | null
  }

  export type ExpenseUpdateWithoutTimesheetEntryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutExpensesNestedInput
    organization?: OrganizationUpdateOneWithoutExpensesNestedInput
    budget?: BudgetUpdateOneWithoutExpensesNestedInput
    category?: BudgetCategoryUpdateOneWithoutExpensesNestedInput
    project?: ProjectUpdateOneWithoutExpensesNestedInput
  }

  export type ExpenseUncheckedUpdateWithoutTimesheetEntryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExpenseUncheckedUpdateManyWithoutTimesheetEntryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BudgetCreateManyProjectInput = {
    id?: string
    name: string
    description?: string | null
    amount: number
    startDate: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    organizationId?: string | null
  }

  export type ExpenseCreateManyProjectInput = {
    id?: string
    title: string
    description?: string | null
    amount: number
    date: Date | string
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    organizationId?: string | null
    budgetId?: string | null
    categoryId?: string | null
    timesheetEntryId?: string | null
  }

  export type TimesheetCreateManyProjectInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    organizationId?: string | null
  }

  export type BudgetUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutBudgetsNestedInput
    organization?: OrganizationUpdateOneWithoutBudgetsNestedInput
    categories?: BudgetCategoryUpdateManyWithoutBudgetNestedInput
    expenses?: ExpenseUpdateManyWithoutBudgetNestedInput
  }

  export type BudgetUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    categories?: BudgetCategoryUncheckedUpdateManyWithoutBudgetNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutBudgetNestedInput
  }

  export type BudgetUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExpenseUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutExpensesNestedInput
    organization?: OrganizationUpdateOneWithoutExpensesNestedInput
    budget?: BudgetUpdateOneWithoutExpensesNestedInput
    category?: BudgetCategoryUpdateOneWithoutExpensesNestedInput
    timesheetEntry?: TimesheetEntryUpdateOneWithoutExpensesNestedInput
  }

  export type ExpenseUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    timesheetEntryId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExpenseUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    timesheetEntryId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TimesheetUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutTimesheetsNestedInput
    organization?: OrganizationUpdateOneWithoutTimesheetsNestedInput
    entries?: TimesheetEntryUpdateManyWithoutTimesheetNestedInput
  }

  export type TimesheetUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    entries?: TimesheetEntryUncheckedUpdateManyWithoutTimesheetNestedInput
  }

  export type TimesheetUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}