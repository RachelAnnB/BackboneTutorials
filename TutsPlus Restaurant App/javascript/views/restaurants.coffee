class Gourmet.Views.RestaurantsView extends Backbone.View
  template: Hogan.compile $('#restaurant-template').html()
  initialize: ->
    @render @collection
  render: =>
    @$el.empty()
    for restaurant in @collection.models
      do (restaurant) =>
        @$el.append @template.render(restaurant.toJSON())
  
  events:
    'click .remove': 'removeRestaurant'
    
  removeRestaurant: (evt) =>
    id = evt.target.id
    model = @collection.get id
    @collection.remove model
    model.destroy()