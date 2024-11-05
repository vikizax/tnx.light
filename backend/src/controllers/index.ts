import { FastifyInstance } from "fastify";
import { intoResultAsync } from "../utils/result";
import { CommonResponse, CommonResponseSchema } from "../types/common";
import {
  checkSpaceExists,
  createSpace,
  createTnxBySpaceId,
  deleteTnxBySpaceIdTnxId,
  getAllTnxBySpaceId,
  updateTnxBySpaceIdTnxId,
} from "../services/space.service";
import { logs } from "../utils/common";
import {
  CreateSpaceTnx,
  CreateSpaceTnxSchema,
  DeleteSpaceTnxParams,
  DeleteSpaceTnxParamsSchema,
  GetAllTransactionsQueryParams,
  GetAllTransactionsQueryParamsSchema,
  SpaceTnxParams,
  SpaceTnxParamsSchema,
  UpdateSpaceTnx,
  UpdateSpaceTnxQuery,
  UpdateSpaceTnxSchema,
} from "./types";

export function SpaceActions(fastify: FastifyInstance) {
  // check space exists
  fastify.get<{ Reply: CommonResponse; Params: SpaceTnxParams }>(
    "/:spaceId/status",
    {
      schema: {
        tags: ["spaces"],
        description: "Check if space exists",
        response: {
          200: CommonResponseSchema,
        },
        params: SpaceTnxParamsSchema,
      },
    },
    async (req, rep) => {
      const [isExists, error] = await intoResultAsync(
        checkSpaceExists,
        req.params.spaceId
      );

      if (error) {
        logs("ERROR >> ");
        logs(error);
        return rep.internalServerError(
          "Something went wrong while checking for space"
        );
      }

      return rep.code(200).send({
        status: 200,
        data: isExists,
      });
    }
  );

  // create a space
  fastify.post<{ Reply: CommonResponse }>(
    "/",
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
    Querystring: GetAllTransactionsQueryParams;
    Params: SpaceTnxParams;
    Reply: CommonResponse;
  }>(
    "/:spaceId/transactions",
    {
      schema: {
        querystring: GetAllTransactionsQueryParamsSchema,
        params: SpaceTnxParamsSchema,
        response: { 200: CommonResponseSchema },
        tags: ["spaces"],
        description: "Get all space transactions",
      },
    },
    async (req, rep) => {
      const { limit, page, ...filters } = req.query;
      const [tnxs, error] = await intoResultAsync(
        getAllTnxBySpaceId,
        req.params.spaceId,
        limit ?? 10,
        page ?? 1,
        filters
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
    Params: SpaceTnxParams;
    Reply: CommonResponse;
    Body: CreateSpaceTnx;
  }>(
    "/:spaceId/transactions",
    {
      schema: {
        params: SpaceTnxParamsSchema,
        response: { 200: CommonResponseSchema },
        tags: ["spaces"],
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

      return rep
        .code(201)
        .send({ status: 201, msg: "Transaction created successfully" });
    }
  );

  // update a space tnx
  fastify.put<{
    Params: UpdateSpaceTnxQuery;
    Reply: CommonResponse;
    Body: UpdateSpaceTnx;
  }>(
    "/:spaceId/transactions/:transactionId",
    {
      schema: {
        body: UpdateSpaceTnxSchema,
        params: UpdateSpaceTnxSchema,
        response: { 200: CommonResponseSchema },
        tags: ["spaces"],
        description: "Update a transaction of a space",
      },
    },
    async (req, rep) => {
      const [_, error] = await intoResultAsync(
        updateTnxBySpaceIdTnxId,
        req.params.spaceId,
        req.params.transactionId,
        req.body
      );

      if (error) {
        logs("Error >>");
        logs(error);
        return rep.internalServerError(
          "Something went wrong while updating the transaction"
        );
      }

      return rep
        .code(200)
        .send({ status: 200, msg: "Transaction updated successfully" });
    }
  );

  // delete a space tnx
  fastify.delete<{
    Params: DeleteSpaceTnxParams;
    Reply: CommonResponse;
  }>(
    "/:spaceId/transactions/:transactionId",
    {
      schema: {
        params: DeleteSpaceTnxParamsSchema,
        response: { 200: CommonResponseSchema },
        tags: ["spaces"],
        description: "Delete a transaction of a space",
      },
    },
    async (req, rep) => {
      const [_, error] = await intoResultAsync(
        deleteTnxBySpaceIdTnxId,
        req.params.spaceId,
        req.params.transactionId
      );

      if (error) {
        logs("Error >>");
        logs(error);
        return rep.internalServerError(
          "Something went wrong while deleting the transaction"
        );
      }

      return rep
        .code(200)
        .send({ status: 200, msg: "Transaction deleted successfully" });
    }
  );
}
