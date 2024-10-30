import { FastifyPluginAsync } from "fastify";
import { SpaceActions } from "../../controllers";

export const route: FastifyPluginAsync = async (fastify) => {
  SpaceActions(fastify);
};

export default route;
