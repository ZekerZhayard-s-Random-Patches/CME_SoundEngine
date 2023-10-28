
var ASMAPI = Java.type("net.minecraftforge.coremod.api.ASMAPI");
var Opcodes = Java.type("org.objectweb.asm.Opcodes");
var InsnNode = Java.type("org.objectweb.asm.tree.InsnNode");
var MethodInsnNode = Java.type("org.objectweb.asm.tree.MethodInsnNode");

function initializeCoreMod() {
    return {
        "SoundEngine_<init>": {
            "target": {
                "type": "METHOD",
                "class": "net/minecraft/client/sounds/SoundEngine",
                "methodName": "<init>",
                "methodDesc": "(Lnet/minecraft/client/sounds/SoundManager;Lnet/minecraft/client/Options;Lnet/minecraft/server/packs/resources/ResourceManager;)V"
            },
            "transformer": function (mn) {
                var insnList = mn.instructions.toArray();
                for (var i = 0; i < insnList.length; i++) {
                    var node = insnList[i];
                    if (node.getOpcode() === Opcodes.PUTFIELD && node.owner.equals("net/minecraft/client/sounds/SoundEngine") && node.name.equals(ASMAPI.mapField("f_120226_")) && node.desc.equals("Ljava/util/Map;")) {
                        mn.instructions.insertBefore(node, new InsnNode(Opcodes.POP));
                        mn.instructions.insertBefore(node, new MethodInsnNode(Opcodes.INVOKESTATIC, "io/github/zekerzhayard/cme_soundengine/ConcurrentHashMapWithNullKey", "create", "()Ljava/util/Map;", false));
                    }
                }
                return mn;
            }
        }
    }
}