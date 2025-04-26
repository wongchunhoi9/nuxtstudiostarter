<template>
    <div class="px-4 text-slate-600 text-right text-base " >
            <!-- <slot /> -->
            <ContentSlot :use="$slots.default" unwrap="p" />
    </div>
</template>