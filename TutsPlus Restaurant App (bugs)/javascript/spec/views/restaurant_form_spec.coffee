describe "Restaurant Form", ->

  describe "Form submit", ->
  
    # attrs need to be alphabetical ordered!
    validAttrs =
      name: 'Panjab',
      postcode: '123456',
      rating: '5'
      
    invalidAttrs =
      name: '',
      postcode: '123456',
      rating: '5'
  
    beforeEach ->
      @serialized_data = [
        {
          name: 'restaurant[name]',
          value: 'Panjab'
        },
        
        {
          name: 'restaurant[rating]',
          value: '5'
        },
        
        {
          name: 'restaurant[postcode]',
          value: '123456'
        }
      ]
      spyOn(@restaurant_form.$el, 'serializeArray').andReturn @serialized_data
  
  
  
  afterEach ->
    @server.restore()
    
  it "should parse form data", ->
    expect (@restaurant_form.parseFormData(@serialized_data)).toEqual validAttrs
    
  it "should add a restaurant when form data is valid", ->
    spyOn(@restaurant_form, 'parseFormData').andReturn validAttrs
    @restaurant_form.save()    #we mock the click by calling the method
    expect(@restaurant_form.collection.length).toEqual 1
  
  it "should not add a restaurant when form data is invalid", ->
    spyOn(@restaurant_form, 'parseFormData').andReturn invalidAttrs
    @restaurant_form.save()
    expect(@restaurant_form.collection.length).toEqual 0
  
  it "should send an ajax request to the server", ->
    spyOn(@restaurant_form, 'parseFormData').andReturn validAttrs
    @restaurant_form.save()
    expect(@server.requests.length).toEqual 1
    expect(@server.requests[0].method).toEqual('POST')
    expect(@server.requests[0].requestBody).toEqual JSON.stringify(validAttrs)
    
  it "should show validation errors when data is invalid", ->
    spyOn(@restaurant_form, 'parseFormData').andReturn invalidAttrs
    @restaurant_form.save()
    expect($('.error', $(@invisible_form)).length).toEqual 1



  jasmine.getFixtures().fixturesPath = 'javascript/spec/fixtures'
  
  beforeEach ->
    loadFixtures 'restaurant_form.html'
    @invisible_form = $('#restaurant-form')
    @restaurant_form = new Gourmet.Views.RestaurantForm
      el: @invisible_form
      collection: new Gourmet.Views.RestaurantsCollection
      
  it "should be defined", ->
    expect(Gourmet.Views.RestaurantForm).toBeDefined()
    
  it "should have the right element", ->
    expect(@restaurant_form.$el).toEqual @invisible_form
    
  it "should have a collection", ->
    expect(@restaurant_form.collection).toEqual (new Gourmet.Views.RestaurantsCollection)
    
  it "should parse from data", ->
    expect(@restaurant_form.parseFormData(@serialized_data)).toEqual
      name: 'Panjab',
      raing: '5',
      postcode: '123456'
      
  it "should add a restaurant when form data is valid", ->
    spyOn(@restaurant_form, 'parseFormData').andReturn
      name: 'Panjab',
      rating: '5',
      postcode: '123456'
    @restaurant_form.save()   #we mock the click by calling the method
    expect(@restaurant_form.collection.length).toEqual 1
    
  it "should not add a restaurant when form data is invalide", ->
    spyOn(@restaurant_form, 'parseFormData').andReturn
      name: '',
      rating: '5',
      postcode: '123456'
    @restaurant_form.save()
    expect(@restaurant_form.collection.length).toEqual 0
    
  it "should show validation errors when data is invalid", ->
    spyOn(@restaurant_form, 'parseFormData').andReturn
      name: '',
      rating: '5',
      postcode: '123456'
    @restaurant_form.save()
    expect($('.error', $(@invisible_form)).length).toEqual 1