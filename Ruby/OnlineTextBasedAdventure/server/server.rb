require './players'
require 'socket'
BasicSocket.do_not_reverse_lookup = true
# Create socket and bind to address
client = UDPSocket.new
print 'Please enter servers Ip: '
ip = gets.chomp
#'10.180.3.3'
client.bind(ip, 1234)
puts 'Server connected.'
done = false;
plyrs = []
while !done do
  data, addr = client.recvfrom(1024) # if this number is too low it will drop the larger packets and never give them to you
  message = data.split(' ')
  if  message[0] == 'connect'
      puts data
      puts message[1] + ", IP:#{addr[2]},  Port:#{addr[1]}"
      plyrs << Players.new(message[1], addr[2], addr[1])
      curP = plyrs[plyrs.length-1]
      client.send("Welcome to the server #{curP.name}!", 0, curP.ip, curP.port)

  elsif message[0] == 'players'
    msg = 'The current players on the server are '
    plyrs.each do |pl|
      msg = msg + pl.name + ': ' + pl.location + ' '
    end
    client.send(msg, 0, addr[2], addr[1])
  elsif message[0] == 'location'
    plyrs.each do |pl|
      if pl.ip == addr[2] && pl.port == addr[1]
        pl.location = message[1]
        puts pl.name + "'s new location is " + pl.location
      end
    end
  elsif message[0] == 'send'
    plyrs.each do |pl|
      if pl.ip == addr[2] && pl.port == addr[1]
        msg =  "#{pl.name}: "
      end
    end
    msg = msg + message[2..message.length-1].join(' ')
    plyrs.each do |pl|
      if pl.name.chomp.downcase == message[1].chomp.downcase
           pl.messages.push (msg)
           puts pl.messages[0]
      end
    end
  elsif message[0] == 'getNum'
    plyrs.each do |pl|
      if pl.ip == addr[2] && pl.port == addr[1]
        client.send(pl.messages.length.to_s, 0, addr[2], addr[1])
      end
    end
  elsif message[0] ='messages'
    plyrs.each do |pl|
      if pl.ip == addr[2] && pl.port == addr[1]
        inbox = pl.messages.join("\n")
        client.send(inbox, 0, addr[2], addr[1])
      end
    end
  end
end
client.close