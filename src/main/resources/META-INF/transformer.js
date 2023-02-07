
var ASMAPI = Java.type("net.minecraftforge.coremod.api.ASMAPI");
var Opcodes = Java.type("org.objectweb.asm.Opcodes");
var InsnList = Java.type("org.objectweb.asm.tree.InsnList");
var InsnNode = Java.type("org.objectweb.asm.tree.InsnNode");
var JumpInsnNode = Java.type("org.objectweb.asm.tree.JumpInsnNode");
var LabelNode = Java.type("org.objectweb.asm.tree.LabelNode");
var MethodInsnNode = Java.type("org.objectweb.asm.tree.MethodInsnNode");
var TypeInsnNode = Java.type("org.objectweb.asm.tree.TypeInsnNode");
var VarInsnNode = Java.type("org.objectweb.asm.tree.VarInsnNode");

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
                        mn.instructions.insertBefore(node, new TypeInsnNode(Opcodes.NEW, "java/util/concurrent/ConcurrentHashMap"));
                        mn.instructions.insertBefore(node, new InsnNode(Opcodes.DUP));
                        mn.instructions.insertBefore(node, new MethodInsnNode(Opcodes.INVOKESPECIAL, "java/util/concurrent/ConcurrentHashMap", "<init>", "()V", false));
                    }
                }
                return mn;
            }
        },
        "SoundEngine_func_217933_b": {
            "target": {
                "type": "METHOD",
                "class": "net/minecraft/client/audio/SoundEngine",
                "methodName": "func_217933_b",
                "methodDesc": "(Lnet/minecraft/client/audio/ISound;)Z"
            },
            "transformer": function (mn) {
                var il = new InsnList();
                var ln = new LabelNode();
                il.add(new VarInsnNode(Opcodes.ALOAD, 1));
                il.add(new JumpInsnNode(Opcodes.IFNONNULL, ln));
                il.add(new InsnNode(Opcodes.ICONST_0));
                il.add(new InsnNode(Opcodes.IRETURN));
                il.add(ln);
                mn.instructions.insert(il);
                return mn;
            }
        }
    }
}