import { handleActions } from "redux-actions";
import { hasResponseError } from "utils";
// import moment from 'moment'
import { message } from "antd";

const newsInfoState = () => ({
  data: []
});

export const newsData = handleActions(
  {
    request_newsList_List(state, action) {
      return { ...state };
    },
    receive_newsList_List(state, action) {
      //   return { modalVisible: true };
      const { req, res } = action.payload;
      if (hasResponseError(res)) {
        message.error(res.msg);
        return { ...state };
      }
      return { ...res.data };
    }
  },
  newsInfoState()
);
