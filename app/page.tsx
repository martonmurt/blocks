import * as React from 'react'
import { type Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getRegistryBlocks, getRegistryComponent, getRegistryEntry, getRegistryKit } from '@/lib/registry'

import { ComponentPreview } from './view/[name]/component-preview'

const getCachedRegistryEntry = React.cache((name: string | undefined) => {
    return name ? getRegistryEntry(name) : null
})

export async function generateStaticParams() {
    return getRegistryBlocks().map((block) => ({
        name: block.name,
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ name?: string }> }): Promise<Metadata> {
    const { name } = await params
    const item = getCachedRegistryEntry(name)

    if (!item) {
        return { title: 'Tailark Registry' }
    }

    return {
        title: `${item.title ?? item.name} - Tailark`,
        description: item.description,
        robots: {
            index: false,
            follow: false,
        },
    }
}

export default async function RegistryBlockViewPage({ params }: { params: Promise<{ name?: string }> }) {
    const { name } = await params

    if (!name) {
        const blocks = getRegistryBlocks()

        return (
            <main className="min-h-screen bg-background px-6 py-16 text-foreground sm:px-10">
                <div className="mx-auto max-w-6xl">
                    <header className="mb-12 max-w-2xl">
                        <p className="mb-3 text-sm font-medium text-muted-foreground">Tailark Registry</p>
                        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Open source shadcn/ui registry for Tailark.</h1>
                        <p className="mt-5 text-lg text-muted-foreground">Browse the available blocks and pages, then open any item to preview it.</p>
                    </header>
                    <section aria-label="Registry items" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {blocks.map((block) => (
                            <Link key={block.name} href={`/view/${block.name}`} className="rounded-xl border bg-card p-5 transition-colors hover:bg-accent">
                                <h2 className="font-medium">{block.title ?? block.name}</h2>
                                {block.description ? <p className="mt-2 text-sm text-muted-foreground">{block.description}</p> : null}
                            </Link>
                        ))}
                    </section>
                </div>
            </main>
        )
    }

    const item = getCachedRegistryEntry(name)
    const kit = getRegistryKit(name)
    const Component = await getRegistryComponent(name)

    if (!item || !kit || !Component) {
        notFound()
    }

    return (
        <ComponentPreview theme={kit}>
            <Component />
        </ComponentPreview>
    )
}
