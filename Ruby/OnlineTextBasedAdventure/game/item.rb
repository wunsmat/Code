require './command'
require './location'
require './player'
require './inventory'
require './item'

class Item
  attr_accessor :name, :desc
  def initialize(n, d)
    @name = n
    @desc = d
  end
end