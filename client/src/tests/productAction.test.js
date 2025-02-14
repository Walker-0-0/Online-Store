import mockAxios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";
import { listProduct} from "../Redux/Actions/ProductActions.js";

const mockStore = configureMockStore([thunk, promiseMiddleware()]);

describe("products Actions", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      users: {}
    });
  });

  describe("action creator", () => {
    it("dispatches actions", async () => {
      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: [{ id: 1, name: "bag" }]
        })
      );

      await store.dispatch(listProduct());
      const actions = store.getActions();
      expect(actions[0].type).toEqual("PRODUCT_LIST_REQUEST");
      expect(actions[1].type).toEqual("PRODUCT_LIST_SUCCESS");
    });
  });
});