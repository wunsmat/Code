require './command'
require './location'
require './player'
require './inventory'
require './item'

class Command
  def initialize
  end

  def command(cmd, player, s)
    msg = cmd
    cmd = cmd.split(' ')
    if cmd[0] == 'look'
      player.look()
    elsif cmd[0] == 'go'
      if player.pLocation.exits.has_key?(cmd[1])
        player.pLocation = player.pLocation.exits.fetch(cmd[1])
        s.send('location ' + player.pLocation.name, 0)
        player.look()
      else
        puts "Sorry, there's nothing in that direction."
      end
    elsif cmd[0] == 'take'
      myLoc = player.pLocation
      for i in 0..myLoc.items.length-1
        if myLoc.items[i] != nil
          itemName = myLoc.items[i].name.downcase
          if itemName == cmd[1]
            added = player.bag.addToBag(player.pLocation.items[i])
            if added == true
              myLoc.items.delete_at(i)
              break
            end
          end
        else
          puts 'Sorry, item does not exist.'
          break
        end
      end
    elsif cmd[0] == 'inventory'
       player.bag.printBag
    elsif cmd[0] == 'send'
      s.send(msg, 0)
    elsif cmd[0] == 'messages'
      s.send(msg, 0)
      data, addr = s.recvfrom(300)
      puts data
    else
      puts 'Sorry, that command does not exist.'
    end
    end
end
