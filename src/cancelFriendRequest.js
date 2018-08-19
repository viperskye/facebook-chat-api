"use strict";

var utils = require("../utils");
var log = require("npmlog");

module.exports = function(defaultFuncs, api, ctx) {
  return function cancelFriendRequest(id, callback) {
    if (!callback) {
      throw { error: "cancelFriendRequest: need callback" };
    }

    var form = {
      "friend": "",
      "cancel_ref": "profile",
      "floc": "profile_button",
      "__be": 1,
      "confirmed": 1
    }
    form.friend = id;

    defaultFuncs
      .post("https://www.facebook.com/ajax/friends/requests/cancel.php?dpr=1", ctx.jar, form)
      .then(utils.parseAndCheckLogin(ctx, defaultFuncs))
      .then(function(resData) {
        if (resData.error) {
          throw resData;
        }
        return callback(null, resData);
      })
      .catch(function(err) {
        log.error("cancelFriendRequest", err);
        return callback(err);
      });
  };
};
