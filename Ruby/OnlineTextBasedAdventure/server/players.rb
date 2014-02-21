class Players
  attr_accessor :name, :ip, :port, :location, :messages

  def initialize(n, ip, port)
    @name = n
    @ip = ip
    @port = port
    @location = 'Bedroom'
    @messages = Array.new
  end
end