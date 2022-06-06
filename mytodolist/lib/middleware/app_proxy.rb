require 'rack-proxy'

class AppProxy < Rack::Proxy

  def perform_request(env)
    request = Rack::Request.new(env)
    if request.path =~ %r{^/proxy} 
      set_host(env)
      env['PATH_INFO'] = '/'
      super(env)
    elsif request.path =~ %r{^/_next.*$}
      set_host(env) 
      env['PATH_INFO'] = request.path
      super(env)
    else
      @app.call(env)
    end
  end

  def set_host (env)
    # client nextjs app on localhost:3001
    env["HTTP_HOST"] = "localhost:3001"
  end

end
