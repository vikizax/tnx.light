import { Type, Static } from "@sinclair/typebox";

export const CommonResponseSchema = Type.Object({
  msg: Type.Optional(Type.String()),
  status: Type.Number(),
  data: Type.Optional(Type.Any())
});

export type CommonResponse = Static<typeof CommonResponseSchema>
