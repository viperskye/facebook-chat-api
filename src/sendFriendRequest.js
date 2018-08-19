"use strict";

var utils = require("../utils");
var log = require("npmlog");

module.exports = function(defaultFuncs, api, ctx) {
  return function sendFriendRequest(id, callback) {
    if (!callback) {
      throw { error: "sendFriendRequest: need callback" };
    }

    var form = {
      to_friend: "",
      action: "add_friend",
      how_found: "profile_button",
      ref_param: "none",
      link_data : {
          gt: {
              type: "xtracking",
              xt: {
                  "event":"add_friend",
                  "intent_status":null,
                  "intent_type":null,
                  "profile_id": "",
                  "ref":1
              },
              profile_owner: "",
              ref: "timeline:timeline"
          }
      },
      outgoing_id: "js_lz",
      logging_location: "",
      no_flyout_on_click: true,
      ego_log_data: "",
      http_referer: "",
      floc: "profile_button",
      frefs: ["none"],
      __dyn: "",
      __be: "",
    };
    form.to_friend = id;
    form.link_data.gt.xt.profile_id = id;
    form.link_data.gt.profile_owner = id;

    defaultFuncs
      .post("https://www.facebook.com/ajax/add_friend/action.php?dpr=1", ctx.jar, form)
      .then(utils.parseAndCheckLogin(ctx, defaultFuncs))
      .then(function(resData) {
        if (resData.error) {
          throw resData;
        }
        return callback(null, resData);
      })
      .catch(function(err) {
        log.error("sendFriendRequest", err);
        return callback(err);
      });
  };
};
