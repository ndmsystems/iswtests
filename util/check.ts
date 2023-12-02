import { Locator, expect } from "@playwright/test"

export const check = async (checkbox: Locator): Promise<void> => {
    await checkbox.dispatchEvent('click')
    await expect(checkbox).toBeChecked()
}