import { pgTable, varchar, uuid, timestamp, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// --- usersTable ---
export const usersTable = pgTable('usersTable', {
    id: uuid('id').defaultRandom().primaryKey(),
    username: varchar('username').unique().notNull(),
    firstName: varchar('first_name', { length: 30 }).notNull(),
    lastName: varchar('last_name', { length: 30 }).notNull(),
    password: varchar('password', { length: 100 }).notNull(),
    timeZone: varchar('time_zone', { length: 100 }).notNull().default("UTC"),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull()
});

// --- linksTable with ON DELETE CASCADE on userId ---
export const linksTable = pgTable('linksTable', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
        .notNull()
        .references(() => usersTable.id, { onDelete: 'cascade' }),
    url: varchar('url', { length: 1000 }).notNull(),
    slug: varchar('slug', { length: 100 }).unique().notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull()
});

// --- clicksTable with ON DELETE CASCADE on linkId ---
export const clicksTable = pgTable('clicksTable', {
    id: uuid('id').defaultRandom().primaryKey(),
    linkId: uuid('link_id').notNull().references(() => linksTable.id, { onDelete: 'cascade' }),

    ip: varchar('ip', { length: 45 }),
    country: varchar('country', { length: 90 }),
    state: varchar('state', { length: 90 }),
    city: varchar('city', { length: 90 }),
    latitude: varchar('latitude', { length : 15 }),
    longitude: varchar('longitude', { length : 15 }),

    device: varchar('device', { length: 20 }),
    deviceVendor: varchar('device_vendor', { length: 50 }),
    orientation: varchar('orientation', { length: 20 }),
    darkMode: boolean('dark_mode'),
    os: varchar('os', { length: 50 }),
    browser: varchar('browser', { length: 50 }),
    userAgent: varchar('user_agent', { length: 500 }),

    network: varchar('network', { length: 100 }),
    language: varchar('language', { length: 10 }),
    referrer: varchar('referrer', { length: 1000 }),
    clickType: varchar('click_type', { length: 20 }),

    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull()
});

// --- relations ---
export const usersTableRelations = relations(usersTable, ({ many }) => ({
    links: many(linksTable)
}));

export const linksTableRelations = relations(linksTable, ({ one, many }) => ({
    user: one(usersTable, {
        fields: [linksTable.userId],
        references: [usersTable.id]
    }),
    clicks: many(clicksTable)
}));

export const clicksTableRelations = relations(clicksTable, ({ one }) => ({
    link: one(linksTable, {
        fields: [clicksTable.linkId],
        references: [linksTable.id]
    })
}));
