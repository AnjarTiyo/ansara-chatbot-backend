// @ts-nocheck
import { Context } from "hono";
import { checkOrigin } from "./index";
import { describe, beforeEach, expect, it, jest } from "bun:test";

describe("authMiddleware", () => {
  let mockContext: Partial<Context>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockContext = {
      req: {
        header: jest.fn(),
      },
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  describe("checkOrigin function", () => {
    it("should call next if request origin is whitelisted", async () => {
      // Set request origin to a whitelisted origin
      mockContext.req.header.mockReturnValue("http://localhost");

      // Call the middleware function
      await checkOrigin(mockContext as Context, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockContext.json).not.toHaveBeenCalled();
    });

    it("should return 403 status if request origin is not whitelisted", async () => {
      // Set request origin to a non-whitelisted origin
      mockContext.req.header.mockReturnValue("https://google.com");

      await checkOrigin(mockContext as Context, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(mockContext.json).toHaveBeenCalledWith(
        {
          status: false,
          message: "Unauthorized! Unknown Access origin!",
        },
        403
      );
    });

    it("should return 403 status if request origin is empty", async () => {
      mockContext.req.header.mockReturnValue("");

      await checkOrigin(mockContext as Context, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(mockContext.json).toHaveBeenCalledWith(
        {
          status: false,
          message: "Unauthorized! Unknown Access origin!",
        },
        403
      );
    });
  });

  describe("isAdmin function", () => {
    it.todo("should call next if user is admin", async () => {});
    it.todo("should return 403 status if user is not admin", async () => {});
    it.todo("should return 403 status if user is unknown", async () => {});
  });

  describe("masterAdmin function", () => {
    it.todo("should call next if user is master admin", async () => {});
    it.todo(
      "should return 403 status if user is not master admin",
      async () => {}
    );
  });
});
