(function() {
  describe("Restaurants view", function() {
    var invisible_table, restaurants_data;
    restaurants_data = [
      {
        id: 0,
        name: 'Ritz',
        postcode: 'N112TP',
        rating: 5
      }, {
        id: 1,
        name: 'Astoria',
        postcode: 'EC1E4R',
        rating: 3
      }, {
        id: 2,
        name: 'Waldorf',
        postcode: 'WE43F2',
        rating: 4
      }
    ];
    invisible_table = document.createElement('table');
    beforeEach(function() {
      this.server = sinon.fakeServer.creat();
      this.restaurants_collection = new Gourmet.Collections.RestaurantsCollection(restaurants_data);
      return this.restaurants_view = new Gourmet.Views.RestaurantsView({
        collection: this.restaurants_collection,
        el: invisible_table
      });
    });
    afterEach(function() {
      return this.server.restore();
    });
    it("should be defined", function() {
      return expect(Gourmet.Views.RestaurantsView).toBeDefined();
    });
    it("should have the right element", function() {
      return expect(this.restaurants_view.el).toEqual(invisible_table);
    });
    it("should have the right collection", function() {
      return expect(this.restaurants_view.collection).toEqual(this.restaurants_collection);
    });
    it("should render the the view when initialized", function() {
      return expect($(invisible_table).children().length).toEqual(3);
    });
    it("should render when an element is added to the collection", function() {
      this.restaurants_collection.add({
        name: 'Panjab',
        postcode: 'N2243T',
        rating: 5
      });
      return expect($(invisible_table).children().length).toEqual(4);
    });
    it("should render when an element is removed form the colleciton", function() {
      this.restaurants_collection.pop();
      return expect($(invisible_table).children().length).toEqual(2);
    });
    ({
      initialize: function() {
        this.render(this.collection);
        this.collection.on('add', this.render);
        return this.collection.on('remove', this.render);
      }
    });
    it("should remove the restaurant when clicking the remove icon", function() {
      var remove_button, removed_restaurant;
      remove_button = $('.remove', $(invisible_table))[0];
      $(remove_button).trigger('click');
      removed_restaurant = this.restaurants_collection.get(remove_button.id);
      expect(this.restaurants_colections.length).toEqual(2);
      return expect(this.restaurants_collection.models).not.toContain(removed_restaurant);
    });
    it("should remove a restaurant from the collection", function() {
      var evt;
      evt = {
        target: {
          id: 1
        }
      };
      this.restaurants_view.removeRestaurant(evt);
      return expect(this.restaurants_collection.length).toEqual(2);
    });
    return it("should send an ajax request to delete the restaurant", function() {
      var evt;
      evt = {
        target: {
          id: 1
        }
      };
      this.restaurants_view.removeRestaurant(evt);
      expect(this.server.requests.length).toEqual(1);
      expect(this.server.requests[0].method).toEqual('DELETE');
      return expect(this.server.requests[0].url).toEqual('/restaurants/1');
    });
  });

}).call(this);
