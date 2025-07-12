import { apiEndpoints } from '../config/env';
import { api, withRetry } from '../utils/apiClient';
import { getUserFriendlyMessage } from '../types/errors';

/**
 * Delete an event by ID
 */
async function deleteEvent(id: string): Promise<void> {
    try {
        await withRetry(() => api.delete(`${apiEndpoints.events}/${id}`));
    } catch (error) {
        const message = getUserFriendlyMessage(error as Error);
        throw new Error(`Failed to delete event: ${message}`);
    }
}

/**
 * Update event description
 */
async function updateEventDescription(id: string, description: string): Promise<void> {
    try {
        await withRetry(() =>
            api.patch(`${apiEndpoints.events}/${id}`, {
                event_description: description
            })
        );
    } catch (error) {
        const message = getUserFriendlyMessage(error as Error);
        throw new Error(`Failed to update event: ${message}`);
    }
}

export { updateEventDescription, deleteEvent };
