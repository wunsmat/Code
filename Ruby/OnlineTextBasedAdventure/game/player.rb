require './command'
require './location'
require './player'
require './inventory'
require './item'

class Player
  attr_accessor :name, :pLocation, :bag

  def initialize(n, pLoc)
    @name = n
    @pLocation = pLoc
    @bag = Inventory.new
  end

  def look
    myLoc = self.pLocation
    puts('~' + myLoc.name + '~')
    puts(' ' + myLoc.desc)
    exits = 'The exits for the current area are: '
    if pLocation.exits.has_key?('north')
      exits = exits + 'North:' + myLoc.exits.fetch('north').name + ' '
    end
    if pLocation.exits.has_key?('west')
      exits = exits + 'West:' + myLoc.exits.fetch('west').name + ' '
    end
    if pLocation.exits.has_key?('east')
      exits = exits + 'East:' + myLoc.exits.fetch('east').name + ' '
    end
    if pLocation.exits.has_key?('south')
      exits = exits + 'South:' + myLoc.exits.fetch('south').name + ' '
    end
    puts exits
    if myLoc.items.length > 0
      it = 'You see'
      for i in 0..myLoc.items.length-1
        item = myLoc.items[i]
        it = it + ' ' + item.name
      end
      puts it
    end
  end
end
