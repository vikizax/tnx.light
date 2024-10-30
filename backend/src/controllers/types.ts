import { Type, Static } from "@sinclair/typebox";

export const SpaceTnxQuerySchema = Type.Object({
  spaceId: Type.Number(),
});

export type SpaceTnxQuery = Static<typeof SpaceTnxQuerySchema>;

export const CreateSpaceTnxSchema = Type.Object({
  type: Type.Union([Type.Literal("expanse"), Type.Literal("income")]),
  amount: Type.Number({ minimum: 1 }),
  createdAt: Type.Date(),
  description: Type.Optional(Type.String()),
  category: Type.Optional(Type.String()),
});

export type CreateSpaceTnx = Static<typeof CreateSpaceTnxSchema>;
