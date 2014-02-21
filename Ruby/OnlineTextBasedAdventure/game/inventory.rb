require './command'
require './location'
require './player'
require './inventory'
require './item'

class Inventory
  attr_accessor :inventory

  def initialize
    @inventory = Array.new
  end

  def addToBag(item)
    added = false
    if inventory.length < 10
      inventory.push(item)
      puts item.name + ' was added to bag.'
      added = true
    else
      puts 'Sorry, your inventory is full.'
    end
      return added
    end

  def printBag
    msg = 'Your inventory contains '
    for i in 0..inventory.length-1
      if inventory[i] != nil
        msg = msg + inventory[i].name + ' '
      else
        break
      end
    end
    puts msg
  end

  def empty
    if inventory[0] == nil
      return true
    else
      return false
    end
  end
end
