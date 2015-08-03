(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Gourmet.Views.RestaurantsView = (function(_super) {
    __extends(RestaurantsView, _super);

    function RestaurantsView() {
      this.removeRestaurant = __bind(this.removeRestaurant, this);
      this.render = __bind(this.render, this);
      return RestaurantsView.__super__.constructor.apply(this, arguments);
    }

    RestaurantsView.prototype.template = Hogan.compile($('#restaurant-template').html());

    RestaurantsView.prototype.initialize = function() {
      return this.render(this.collection);
    };

    RestaurantsView.prototype.render = function() {
      var restaurant, _i, _len, _ref, _results;
      this.$el.empty();
      _ref = this.collection.models;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        restaurant = _ref[_i];
        _results.push((function(_this) {
          return function(restaurant) {
            return _this.$el.append(_this.template.render(restaurant.toJSON()));
          };
        })(this)(restaurant));
      }
      return _results;
    };

    RestaurantsView.prototype.events = {
      'click .remove': 'removeRestaurant'
    };

    RestaurantsView.prototype.removeRestaurant = function(evt) {
      var id, model;
      id = evt.target.id;
      model = this.collection.get(id);
      this.collection.remove(model);
      return model.destroy();
    };

    return RestaurantsView;

  })(Backbone.View);

}).call(this);
