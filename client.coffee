class SHIORI_WORKER_CLASS extends NativeShioriWorkerClient
  @url = URL.createObjectURL(new Blob([worker_code], {type:"text/javascript"}))
  worker: -> @_worker
  load: (dirpath) ->
    @_worker = new URLWorkerClient SHIORI_WORKER_CLASS.url, false
    super(dirpath)

if @ShioriLoader?.shiories?
	@ShioriLoader.shiories.SHIORI_NAME = SHIORI_WORKER_CLASS
else
	throw "load ShioriLoader first"
