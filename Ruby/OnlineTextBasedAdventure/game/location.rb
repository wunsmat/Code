require './command'
require './location'
require './player'
require './inventory'
require './item'

class Location

  attr_accessor :name, :desc, :exits, :items
  def initialize(n, d)
      @name = n
      @desc = d
      @exits = Hash.new
      @items = Array.new
  end
  def addExits(direction, exit)
      self.exits[direction] = exit
  end
  def addItem(item)
    self.items.push(item)
  end
end
