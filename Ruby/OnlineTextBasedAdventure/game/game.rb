require './command'
require './location'
require './player'
require './inventory'
require './item'

require 'socket'

gameOver = false
bedroom = Location.new('Bedroom', 'The place in the house where people sleep.')
hallway = Location.new('Hallway', 'Long dark hallway.')
bathroom = Location.new('Bathroom', 'You see a dirty toilet and a sink.')
livingroom = Location.new('Livingroom', 'A 50 inch wide screen sits in the corner and a couch in the other.')
sword = Item.new('Sword', 'A long shiny sword.')
axe = Item.new('Axe', 'A big axe.')
hallway.addExits('south', bedroom)
hallway.addExits('east', bathroom)
bathroom.addExits('west', hallway)
hallway.addExits('west', livingroom)
livingroom.addExits('east', hallway)
bedroom.addExits('north', hallway)
bedroom.addItem(sword)
bedroom.addItem(axe)

print('Please enter your name:')
player = Player.new(gets.chomp, bedroom)
#'10.180.3.3'
print 'Enter in the servers ip address:'
ip = gets.chomp
messages = '0'
s = UDPSocket.new
s.connect('10.180.3.3', 1234)
s.send 'connect ' + player.name + ' has joined the server.', 0
data, addr = s.recvfrom(1024)
puts data
  player.look
cmd = Command.new
while gameOver===false
  s.send 'getNum', 0
  data, addr = s.recvfrom(300)
  messages = data
  puts "You have #{messages} messages."
  print('Enter Command:')
  g = gets.chomp.downcase
  if g == 'quit'
    gameOver = true
  elsif g == 'players'
    s.send 'players', 0
    data, addr = s.recvfrom(1024)
    puts data
  else
    cmd.command(g, player, s)
  end
end
s.close               # Close the socket when done
