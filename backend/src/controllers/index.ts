import { FastifyInstance } from "fastify";
import { intoResultAsync } from "../utils/result";
import { CommonResponse, CommonResponseSchema } from "../types/common";
import {
  createSpace,
  createTnxBySpaceId,
  getAllTnxBySpaceId,
} from "../services/space.service";
import { logs } from "../utils/common";
import {
  CreateSpaceTnx,
  CreateSpaceTnxSchema,
  SpaceTnxQuery,
  SpaceTnxQuerySchema,
} from "./types";

export function SpaceActions(fastify: FastifyInstance) {
  // create a space
  fastify.post<{ Reply: CommonResponse }>(
    "/spaces",
    {
      schema: {
        tags: ["spaces"],
        description: "Create a space",
        response: {
          201: CommonResponseSchema,
        },
      },
    },
    async (_, rep) => {
      const [spaceId, error] = await intoResultAsync(createSpace);

      if (error) {
        logs("ERROR >> ");
        logs(error);
        return rep.internalServerError(
          "Something went wrong while creating a space"
        );
      }

      return rep.code(201).send({
        status: 201,
        data: spaceId,
        msg: "Space created",
      });
    }
  );

  // get all space tnx
  fastify.get<{
    Params: SpaceTnxQuery;
    Reply: CommonResponse;
  }>(
    "/spaces/:spaceId/transactions",
    {
      schema: {
        params: SpaceTnxQuerySchema,
        response: { 200: CommonResponseSchema },
        tags: ["spaces", "transactions"],
        description: "Get all space transactions",
      },
    },
    async (req, rep) => {
      const [tnxs, error] = await intoResultAsync(
        getAllTnxBySpaceId,
        req.params.spaceId
      );

      if (error) {
        logs("Error >>");
        logs(error);
        return rep.internalServerError(
          "Something went wrong while getting the transactions"
        );
      }

      return rep.code(200).send({
        status: 200,
        data: tnxs,
      });
    }
  );

  // create a new tnx
  fastify.post<{
    Params: SpaceTnxQuery;
    Reply: CommonResponse;
    Body: CreateSpaceTnx;
  }>(
    "/spaces/:spaceId/transactions",
    {
      schema: {
        params: SpaceTnxQuerySchema,
        response: { 200: CommonResponseSchema },
        tags: ["spaces", "transactions"],
        description: "Create a new transaction of a space",
        body: CreateSpaceTnxSchema,
      },
    },
    async (req, rep) => {
      const [_, error] = await intoResultAsync(
        createTnxBySpaceId,
        req.params.spaceId,
        req.body
      );

      if (error) {
        logs("Error >>");
        logs(error);
        return rep.internalServerError(
          "Something went wrong while creating the transaction"
        );
      }

      return rep.code(201).send({ status: 201, msg: "Transaction created" });
    }
  );

  // update a space tnx
  fastify.put<{
    Reply: CommonResponse;
  }>(
    "/spaces/:spaceId/transactions/:transactionId",
    {
      schema: {
        params: SpaceTnxQuerySchema,
        response: { 200: CommonResponseSchema },
        tags: ["spaces", "transactions"],
        description: "Update a transaction of a space",
      },
    },
    async (req, rep) => {}
  );

  // delete a space tnx
  fastify.delete<{
    Reply: CommonResponse;
  }>(
    "/spaces/:spaceId/transactions/:transactionId",
    {
      schema: {
        params: SpaceTnxQuerySchema,
        response: { 200: CommonResponseSchema },
        tags: ["spaces", "transactions"],
        description: "Delete a transaction of a space",
      },
    },
    async (req, rep) => {}
  );
}
