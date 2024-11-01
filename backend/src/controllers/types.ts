import { Type, Static } from "@sinclair/typebox";

export const SpaceTnxParamsSchema = Type.Object({
  spaceId: Type.Number(),
});

export type SpaceTnxParams = Static<typeof SpaceTnxParamsSchema>;

export const CreateSpaceTnxSchema = Type.Object({
  type: Type.Union([Type.Literal("expense"), Type.Literal("income")]),
  amount: Type.Number({ minimum: 1 }),
  createdAt: Type.String({ format: "date-time" }),
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
