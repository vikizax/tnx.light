import { Type, Static } from "@sinclair/typebox";

export const SpaceTnxParamsSchema = Type.Object({
  spaceId: Type.Number(),
});

export type SpaceTnxParams = Static<typeof SpaceTnxParamsSchema>;

export const CreateSpaceTnxSchema = Type.Object({
  type: Type.Union([Type.Literal("expense"), Type.Literal("income")]),
  amount: Type.Number({ minimum: 1 }),
  createdAt: Type.String({ format: "date" }),
  description: Type.Optional(Type.String()),
  category: Type.Optional(Type.String()),
});

export type CreateSpaceTnx = Static<typeof CreateSpaceTnxSchema>;

export const UpdateSpaceTnxSchema = Type.Partial(CreateSpaceTnxSchema);

export type UpdateSpaceTnx = Static<typeof UpdateSpaceTnxSchema>;

export const UpdateSpaceTnxParamsSchema = Type.Intersect([
  SpaceTnxParamsSchema,
  Type.Object({ transactionId: Type.Number() }),
]);

export type UpdateSpaceTnxQuery = Static<typeof UpdateSpaceTnxParamsSchema>;

export const DeleteSpaceTnxParamsSchema = UpdateSpaceTnxParamsSchema;
export type DeleteSpaceTnxParams = Static<typeof DeleteSpaceTnxParamsSchema>;

export const GetAllTransactionsQueryParamsSchema = Type.Object({
  limit: Type.Optional(Type.Number({ minimum: 5, maximum: 20 })),
  page: Type.Optional(Type.Number({ minimum: 1 })),
  type: Type.Optional(
    Type.Union([Type.Literal("expense"), Type.Literal("income")])
  ),
  date: Type.Optional(
    Type.String({
      format: "date",
    })
  ),
  category: Type.Optional(
    Type.String({
      minLength: 1,
    })
  ),
});

export type GetAllTransactionsQueryParams = Static<
  typeof GetAllTransactionsQueryParamsSchema
>;
