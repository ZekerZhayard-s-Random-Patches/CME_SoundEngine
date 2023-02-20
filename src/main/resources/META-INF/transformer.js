
var ASMAPI = Java.type("net.minecraftforge.coremod.api.ASMAPI");
var Opcodes = Java.type("org.objectweb.asm.Opcodes");
var InsnNode = Java.type("org.objectweb.asm.tree.InsnNode");
var MethodInsnNode = Java.type("org.objectweb.asm.tree.MethodInsnNode");

function initializeCoreMod() {
    return {
        "SoundEngine_<init>": {
            "target": {
                "type": "METHOD",
                "class": "net/minecraft/client/audio/SoundEngine",
                "methodName": "<init>",
                "methodDesc": "(Lnet/minecraft/client/audio/SoundHandler;Lnet/minecraft/client/GameSettings;Lnet/minecraft/resources/IResourceManager;)V"
            },
            "transformer": function (mn) {
                var insnList = mn.instructions.toArray();
                for (var i = 0; i < insnList.length; i++) {
                    var node = insnList[i];
                    if (node.getOpcode() === Opcodes.PUTFIELD && node.owner.equals("net/minecraft/client/audio/SoundEngine") && node.name.equals(ASMAPI.mapField("field_217942_m")) && node.desc.equals("Ljava/util/Map;")) {
                        mn.instructions.insertBefore(node, new InsnNode(Opcodes.POP));
                        mn.instructions.insertBefore(node, new MethodInsnNode(Opcodes.INVOKESTATIC, "io/github/zekerzhayard/cme_soundengine/ConcurrentHashMapWithNullKey", "create", "()Ljava/util/Map;", false));
                    }
                }
                return mn;
            }
        }
    }
}