TARGET_JS = yayaworker.js
SHIORI_NAME = yaya
SHIORI_WORKER_CLASS = YAYAWorkerClient
SHIORI_CLASS = YAYA

SHIORI = node_modules/yaya.js/yaya.js
NATIVESHIORI = node_modules/nativeshiori/nativeshiori.js
ENCODING = node_modules/encoding-japanese/encoding.min.js
PROMISE = node_modules/bluebird/js/browser/bluebird.min.js
WORKERSERVER = node_modules/worker-client-server/WorkerServer.js
NATIVESHIORIWORKERSERVER = node_modules/NativeShioriWorker/NativeShioriWorkerServer.js

all: $(TARGET_JS)

$(TARGET_JS): client.coffee server.coffee $(SHIORI) $(NATIVESHIORI) $(ENCODING) $(PROMISE) $(WORKERSERVER) $(NATIVESHIORIWORKERSERVER)
	coffee make_worker_script_auto.coffee $^ $(SHIORI_NAME) $(SHIORI_WORKER_CLASS) $(SHIORI_CLASS) > $@

clean:
	rm *.js *.map

